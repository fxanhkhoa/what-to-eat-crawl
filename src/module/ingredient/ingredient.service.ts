import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, of } from 'rxjs';
import { CreateIngredientDto, Ingredient } from 'src/types/ingredient.type';

@Injectable()
export class IngredientService {
  constructor(private http: HttpService) {}

  create(
    createIngredientDto: CreateIngredientDto,
    token: string,
    host: string,
  ) {
    return this.http.post<Ingredient>(
      `${host}/ingredient`,
      createIngredientDto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  findByTitleLang(title: string, lang: string, host: string) {
    return this.http
      .get<Ingredient>(
        `${host}/ingredient/byTitleLang?title=${title}&lang=${lang}`,
      )
      .pipe(catchError(() => of(null)));
  }
}
