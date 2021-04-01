HttpClientInMemoryWebApiModule.forRoot(CategorieData, { delay: 1000 })
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule, InMemoryBackendConfig, InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CategorieData } from './categorie-data';

export interface ICategorie {
    id: number;
    descriptionCategorie: string;
}

export class ProblemeData implements InMemoryDbService, InMemoryBackendConfig {
    createDb() {
        let typesprobleme: ITypeProbleme[] = [
            {
                'id': 1,
                'descriptionTypeProbleme': 'Problème avec la souris'
            },
            {
                'id': 2,
                'descriptionTypeProbleme': 'Problème de clavier'
            },
            {
                'id': 3,
                'descriptionTypeProbleme': 'Problème d\'accès Internet'
            },
            {
                'id': 4,
                'descriptionTypeProbleme': 'Problème avec un logiciel'
            },
            {
                'id': 5,
                'descriptionTypeProbleme': 'Problème d\'imprimante'
            },
            {
                'id': 6,
                'descriptionTypeProbleme': 'Carte graphique'
            },
            {
                'id': 7,
                'descriptionTypeProbleme': 'Carte mère'
            },
            {
                'id': 8,
                'descriptionTypeProbleme': 'Autre'
            }
        ];
        //return { probleme, typesprobleme};
        return { typesprobleme };
    }
}

  private baseUrl = 'api/categories';

obtenirCategories(): Observable < ICategorie[] > {
    return this.http.get<ICategorie[]>(this.baseUrl).pipe(
        tap(data => console.log('obtenirCategories: ' + JSON.stringify(data))),
        catchError(this.handleError)
    );
}

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
}

this.categories.obtenirCategories()
    .subscribe(cat => this.categoriesProduits = cat,
        error => this.errorMessage = <any>error);

