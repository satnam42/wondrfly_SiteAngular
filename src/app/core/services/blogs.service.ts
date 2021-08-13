// import { Injectable, Query } from '@angular/core';
// import { request, gql } from 'graphql-request'
// import { environment } from 'src/environments/environment';


// @Injectable({
//     providedIn: 'root'
// })

// export class blogslService  {
//     url =environment.blogsUrl;
//     articles:any;
//     blogs:any;
//     getArticles = () => {
//         const articles = gql`
//     query {
//     articles{
//         id
//     title
//     content
//     image{
//     url
//     }
//     published_at
//     }
//     }
//     `
//     request(`${this.url}`,articles).then((data) => {
//         return data
// })
//     }
//     getBlogs = () => {
//     const blogs = gql`
//     query {
//     blogs{
//     title
//     description
//     image{
//     url
//     }
//     published_at
//     }
//     }
//     `
//     request(`${this.url}`, blogs).then((data) => {
// return data })
//     }
// }