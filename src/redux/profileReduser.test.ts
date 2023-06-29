import { profileType } from "../types/types";
import profileReduser, { actions, postType } from "./profileReduser";
import React from 'react';

const state = {
    posts: [
        {
            id: 0,
            avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Photo.png',
            text: 'кушаю',
            likes: 3
        }
        ,
        {
            id: 1,
            avatar: 'https://freelance.ru/img/portfolio/pics/00/3F/3A/4143866.jpg',
            text: 'худею',
            likes: 33
        }
    ] as Array<postType>,
    profile: { photos: { large: '', small: '' } } as profileType | null,
    status: '',
    isEditMode: false

}
test('length of posts should be incremented', () => {
    let action = actions.addPost("new post")
    let newState = profileReduser(state, action)

    expect(newState.posts.length).toBe(3)
});

test('message of new post should be correct', () => {
    let action = actions.addPost("new post")
    let newState = profileReduser(state, action)

    expect(newState.posts[0].text).toBe("new post")
});

test('count of likes to new post should be 0', () => {
    let action = actions.addPost("new post")
    let newState = profileReduser(state, action)

    expect(newState.posts[0].likes).toBe(0)
});

test('length of posts should be decrement', () => {
    let action = actions.deletePost(0)
    let newState = profileReduser(state, action)

    expect(newState.posts.length).toBe(1)
});

test('length of posts should not change with incorrect id', () => {
    let action = actions.deletePost(1000)
    let newState = profileReduser(state, action)

    expect(newState.posts.length).toBe(2)
});