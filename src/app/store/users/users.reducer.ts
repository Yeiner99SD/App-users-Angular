import { createReducer, on } from "@ngrx/store";

import {  addSuccess, find, findAll, findAllPageable, load,  removeSuccess, resetUser, setErrors, setPaginator, setUserForm, updateSuccess } from "./users.actions";
import { User } from "../../models/user";

const users: User[] = []
const user: User = new User

export const usersReducer = createReducer(
    {
        users,
        paginator: {},
        user,
        errors: {},
        loading : true
    },
    on(resetUser, (state) => ({
        users: state.users,
        paginator: state.paginator,
        user: { ...user },
        errors: {},
        loading: state.loading
    })),
    on(setUserForm, (state, {user}) => ({
        users: state.users,
        paginator: state.paginator,
        user: { ...user },
        errors: state.errors,
        loading: state.loading
    })),
    on(load,(state, {page} )  => {
        return {
            users: state.users,
            paginator: state.paginator,
            user: state.user,
            errors: state.errors,
            loading: state.loading

        }
    }),
    on(findAll, (state, {users}) => {
        return {
            users: [... users],
            paginator: state.paginator,
            user: state.user,
            errors: state.errors,
            loading: false
        }
    }),
    on(findAllPageable, (state, {users, paginator}) => {
        return {
            users: [... users],
            paginator: {... paginator},
            user: state.user,
            errors: state.errors,
            loading: false
        }
    }),
    on(find, (state, {id}) => {
        return{
            users: state.users,
            paginator: state.paginator,
            user: state.users.find(user => user.id == id)!,
            errors: state.errors,
            loading: state.loading

        }
    }),
    on(setPaginator, (state, {paginator}) =>{
        return {
            users: state.users,
            paginator: {... paginator},
            user: state.user,
            errors: state.errors,
            loading: state.loading

        }
    }),
    on(addSuccess, (state, {userNew}) => {
        return {
            users: [... state.users , {... userNew}],
            paginator: state.paginator,
            user: state.user,
            errors: {},
            loading: state.loading

        }
    }),
    on(updateSuccess, (state, {userUpdate}) => {
        return {
            users: state.users.map(u => (u.id == userUpdate.id) ? { ...userUpdate } : u),
            paginator: state.paginator,
            user: {... user},
            errors: state.errors,
            loading: state.loading

        }
    }),


    on(removeSuccess, (state, {id}) => {
        return {
            users: state.users.filter(user => user.id != id),
            paginator: state.paginator,
            user: state.user,
            errors: state.errors,
            loading: state.loading

        }
    }),
    on(setErrors,(state, {errors}) => {
        return {
            users: state.users,
            paginator: state.paginator,
            user: state.user,
            errors: {... errors},
            loading: state.loading

        }
    })
);