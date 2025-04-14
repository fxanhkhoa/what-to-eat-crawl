/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { ServerWritableStream } from '@grpc/grpc-js';
import {
  CreateDmxFoodRequest,
  CreateDmxFoodResponse,
} from 'src/types/dmx_food.type';
import {
  Browser,
  Builder,
  By,
  WebDriver,
  WebElement,
} from 'selenium-webdriver';
import { IngredientService } from '../ingredient/ingredient.service';
import { IngredientsInDish } from 'src/types/dish.type';
import { firstValueFrom } from 'rxjs';
import slugify from 'slugify';
import { CreateIngredientDto } from 'src/types/ingredient.type';

@Injectable()
export class DmxFoodService {
  constructor(private ingredientService: IngredientService) {}

  async create(
    requestStream: ServerWritableStream<
      CreateDmxFoodRequest,
      CreateDmxFoodResponse
    >,
    data: CreateDmxFoodRequest,
  ) {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
      await driver.get(data.dmxLink);
      await driver.wait(() => {
        return driver
          .executeScript('return document.readyState')
          .then(function (readyState) {
            return readyState === 'complete';
          });
      });

      requestStream.write({
        log: `Loaded ${data.dmxLink}`,
      });

      const listCategoryElement = await this.getListCategory(driver);
      requestStream.write({
        log: `Loaded listCategory`,
      });

      const listCategory: string[] = [];
      for (const category of listCategoryElement) {
        const elem = await category.findElement(By.css('a'));
        const href = await elem.getAttribute('href');
        listCategory.push(href);
      }

      for (const category of listCategory) {
        const listFoodElem = await this.getListFood(driver, category);
        requestStream.write({
          log: `Loaded listFood for ${category}`,
        });

        const listFood: string[] = [];
        for (const food of listFoodElem) {
          const elem = await food.findElement(By.css('a'));
          const href = await elem.getAttribute('href');
          listFood.push(href);
        }

        for (const food of listFood) {
          await this.buildFood(driver, food, requestStream, data);
        }
      }

      requestStream.write({
        log: `Quitting`,
      });
      await driver.quit();
    } catch (error) {
      requestStream.write({
        log: `${error}`,
      });
      console.log(error);
      await driver.quit();
    }

    return 'This action adds a new dmxFood';
  }

  findAll() {
    return `This action returns all dmxFood`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dmxFood`;
  }

  remove(id: number) {
    return `This action removes a #${id} dmxFood`;
  }

  //  ------------------------------------------------ //

  async getListCategory(driver: WebDriver) {
    await driver
      .findElement(By.xpath('/html/body/section/div[1]/ul/li[27]/a'))
      .click();

    const listCategoryElements = await driver.findElement(
      By.xpath('/html/body/section/div[1]/ul'),
    );

    const listCategory = await listCategoryElements.findElements(By.css('li'));
    return listCategory;
  }

  async getListFood(driver: WebDriver, categoryHref: string) {
    try {
      await driver.get(categoryHref);

      await driver.wait(() => {
        return driver
          .executeScript('return document.readyState')
          .then(function (readyState) {
            return readyState === 'complete';
          });
      });

      const listFoodElement = await driver.findElement(
        By.xpath('/html/body/section/div[5]/ul'),
      );

      const listFood = await listFoodElement.findElements(By.css('li'));
      return listFood;
    } catch {
      return [];
    }
  }

  async buildFood(
    driver: WebDriver,
    foodHref: string,
    requestStream: ServerWritableStream<
      CreateDmxFoodRequest,
      CreateDmxFoodResponse
    >,
    data: CreateDmxFoodRequest,
  ) {
    try {
      await driver.get(foodHref);

      const ingredientDiv = await driver.findElement(By.css('.staple'));
      const ingredients = await this.buildIngredient(
        driver,
        ingredientDiv,
        data,
      );
    } catch (error) {
      console.log(error);
      requestStream.write({
        log: `${error}`,
      });
    }
  }

  async buildIngredient(
    driver: WebDriver,
    element: WebElement,
    data: CreateDmxFoodRequest,
  ): Promise<IngredientsInDish[]> {
    const ingredients = await element.findElements(By.css('span'));

    const ingredientsInDish: IngredientsInDish[] = [];

    for (const ing of ingredients) {
      const fullName = await ing.getText();

      const quantityText = await (
        await ing.findElement(By.css('small'))
      ).getText();
      const quantityArr = quantityText.match(/\d+/);
      let quantity = 0;
      if (quantityArr) {
        quantity = Number(quantityArr[0]);
      }

      const fullNote = await (await ing.findElement(By.css('em'))).getText();
      const note = `${quantityText} ${fullNote}`;

      const name = fullName
        .replace(quantityText, '')
        .replace(fullNote, '')
        .replaceAll('\n', '')
        .trim();

      const response = await firstValueFrom(
        this.ingredientService.findByTitleLang(name, 'vi', data.host),
      );

      let foundIngredient = response.data;

      if (!foundIngredient) {
        const dto: CreateIngredientDto = {
          slug: slugify(name, { lower: true }),
          title: [
            {
              lang: 'vi',
              data: name,
            },
          ],
          ingredientCategory: [],
          images: [],
        };
        console.log(dto);
        const res = await firstValueFrom(
          this.ingredientService.create(dto, data.token, data.host),
        );

        console.log(res.data);
      }

      ingredientsInDish.push({
        quantity,
        slug: '',
        note,
      });
    }

    return ingredientsInDish;
  }
}
