import { inject, Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects'
import { add, addSuccess, findAllPageable, load, remove, removeSuccess, setErrors, update, updateSuccess } from "./users.actions";
import { catchError, EMPTY, exhaustMap, map, of, tap } from "rxjs";

import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";

@Injectable()
export class UserEffects {

    private service = inject(UserService)
    private actions$ = inject(Actions)
    private router= inject(Router)

    loadUsers$ = createEffect(
        () => this.actions$.pipe(
            ofType(load),
            exhaustMap(action => this.service.findAllPageable(action.page)
        .pipe(
            map(pageable => {
                const users = pageable.content as User[];
                const paginator = pageable;

                
                return findAllPageable({users, paginator})
            }),
            catchError(() => EMPTY)
        ))
        )
    );

    addUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(add),
            exhaustMap(action => this.service.createUser(action.userNew)
                .pipe(
                    map(userNew => addSuccess({ userNew })),
                    catchError(error => (error.status == 400) ? of(setErrors({ userForm: action.userNew, errors: error.error })) : of(error)
                    )
                )
            )
        )
    );


    addSuccessUser$= createEffect(
        () => this.actions$.pipe(
            ofType(addSuccess),
            tap(() => {
                this.router.navigate(['/users']) ;
                Swal.fire({
                    title: "Guardado!",
                    text: "Usuario guardado con exito!",
                    icon: "success"
                });
            })
        ), {dispatch: false}
    );

    updateUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(update),
            exhaustMap(action => this.service.updateUser(action.userUpdate)
                .pipe(
                    map(userUpdate => updateSuccess({ userUpdate })),
                    catchError(error => (error.status == 400) ? of(setErrors({ userForm: action.userUpdate, errors: error.error })) : of(error)
                    )
                )
            )
        )
    );

    updateSuccessUser$ = createEffect(() => this.actions$.pipe(
        ofType(updateSuccess),
        tap(() => {
            this.router.navigate(['/users']);

            Swal.fire({
                title: "Actualizado!",
                text: "Usuario editado con exito!",
                icon: "success"
            });
        })
    ), {dispatch: false});

    removeUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(remove),
            exhaustMap(action => this.service.removeUser(action.id)
                .pipe(
                    map(id => removeSuccess({ id })),
                    catchError(() => EMPTY)
                )
            )
        )
    );

    removeSuccessUser$ = createEffect(() => this.actions$.pipe(
        ofType(removeSuccess),
        tap(() => {
            this.router.navigate(['/users']);

           Swal.fire({
            title: "Eliminado!",
            text: "Usuario eliminado con exito.",
            icon: "success"
            });
        })
    ), {dispatch: false});



    

    constructor(){}
}