// import { OrderByPipe } from './orderBy.pipe';
// import { Course } from 'src/app/utilus/global.moduls';

// describe('OrderByPipe', () => {
//   let pipe: OrderByPipe;

//   beforeEach(() => {
//     pipe = new OrderByPipe();
//   });

//   it('should sort courses by creation date in ascending order', () => {
//     const courses: Course[] = [
//       {
//         id: '123',
//         title: 'Video Course 1. Name tag',
//         topRated: true,
//         creationDate: '05/30/2023',
//         duration: '88',
//         description: 'Lorem ipsum'
//       },
//       {
//         id: '345',
//         title: 'Video Course 2. Name tag',
//         topRated: true,
//         creationDate: '08/28/2023',
//         duration: '105',
//         description: 'Lorem ipsum'
//       },
//       {
//         id: '456',
//         title: 'Video Course 3. Name tag',
//         topRated: false,
//         creationDate: '08/28/2020',
//         duration: '94',
//         description: 'Lorem ipsum'
//       }
//     ];

//     const sortedCourses = pipe.transform(courses);

//     expect(sortedCourses).toEqual([
//       {
//         id: '456',
//         title: 'Video Course 3. Name tag',
//         topRated: false,
//         creationDate: '08/28/2020',
//         duration: '94',
//         description: 'Lorem ipsum'
//       },
//       {
//         id: '123',
//         title: 'Video Course 1. Name tag',
//         topRated: true,
//         creationDate: '05/30/2023',
//         duration: '88',
//         description: 'Lorem ipsum'
//       },
//       {
//         id: '345',
//         title: 'Video Course 2. Name tag',
//         topRated: true,
//         creationDate: '08/28/2023',
//         duration: '105',
//         description: 'Lorem ipsum'
//       },
//     ]);
//   });

//   it('should return the same array if courses is empty', () => {
//     const courses: Course[] = [];

//     const sortedCourses = pipe.transform(courses);

//     expect(sortedCourses).toEqual([]);
//   });



// });
