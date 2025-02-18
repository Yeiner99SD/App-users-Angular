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
        errors: {}
    },
    on(resetUser, (state) => ({
        users: state.users,
        paginator: state.paginator,
        user: { ...user },
        errors: {}
    })),
    on(setUserForm, (state, {user}) => ({
        users: state.users,
        paginator: state.paginator,
        user: { ...user },
        errors: state.errors
    })),
    on(load,(state, {page} )  => {
        return {
            users: state.users,
            paginator: state.paginator,
            user: state.user,
            errors: state.errors
        }
    }),
    on(findAll, (state, {users}) => {
        return {
            users: [... users],
            paginator: state.paginator,
            user: state.user,
            errors: state.errors
        }
    }),
    on(findAllPageable, (state, {users, paginator}) => {
        return {
            users: [... users],
            paginator: {... paginator},
            user: state.user,
            errors: state.errors
        }
    }),
    on(find, (state, {id}) => {
        return{
            users: state.users,
            paginator: state.paginator,
            user: state.users.find(user => user.id == id)!,
            errors: state.errors
        }
    }),
    on(setPaginator, (state, {paginator}) =>{
        return {
            users: state.users,
            paginator: {... paginator},
            user: state.user,
            errors: state.errors
        }
    }),
    on(addSuccess, (state, {userNew}) => {
        return {
            users: [... state.users , {... userNew}],
            paginator: state.paginator,
            user: state.user,
            errors: {}
        }
    }),
    on(updateSuccess, (state, {userUpdate}) => {
        return {
            users: state.users.map(u => (u.id == userUpdate.id) ? { ...userUpdate } : u),
            paginator: state.paginator,
            user: {... user},
            errors: state.errors
        }
    }),


    on(removeSuccess, (state, {id}) => {
        return {
            users: state.users.filter(user => user.id != id),
            paginator: state.paginator,
            user: state.user,
            errors: state.errors
        }
    }),
    on(setErrors,(state, {errors}) => {
        return {
            users: state.users,
            paginator: state.paginator,
            user: state.user,
            errors: {... errors}
        }
    })
);