// import { FilterPipe } from './filter.pipe';
// import { Course } from 'src/app/utilus/global.moduls';

// describe('FilterPipe', () => {
//   let pipe: FilterPipe;
//   const courses: Course[] = [
//     {
//       id: '123',
//       title: 'Video Course 1. Name tag',
//       topRated: true,
//       creationDate: '05/30/2023',
//       duration: '88',
//       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam velit est aliquam. Obcaecati incidunt pariatur excepturi eum aliquam laborum dolorem eligendi! Facere tenetur voluptatibus, atque eveniet mollitia perferendis dolores qui.'
//     },
//     {
//       id: '345',
//       title: 'Video Course 2. Name tag',
//       topRated: true,
//       creationDate: '08/28/2023',
//       duration: '105',
//       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam velit est aliquam. Obcaecati incidunt pariatur excepturi eum aliquam laborum dolorem eligendi! Facere tenetur voluptatibus, atque eveniet mollitia perferendis dolores qui.'
//     },
//     {
//       id: '456',
//       title: 'Video Course 3. Name tag',
//       topRated: false,
//       creationDate: '08/28/2020',
//       duration: '94',
//       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam velit est aliquam. Obcaecati incidunt pariatur excepturi eum aliquam laborum dolorem eligendi! Facere tenetur voluptatibus, atque eveniet mollitia perferendis dolores qui.'
//     }
//   ];

//   beforeEach(() => {
//     pipe = new FilterPipe();
//   });

//   it('should return all courses when filterValue is empty', () => {
//     const filterValue = '';
//     const result = pipe.transform(courses, filterValue);
//     expect(result).toEqual(courses);
//   });

//   it('should return courses containing the filterValue in their title', () => {
//     const filterValue = 'course 2';
//     const expectedCourses = [{
//       id: '345',
//       title: 'Video Course 2. Name tag',
//       topRated: true,
//       creationDate: '08/28/2023',
//       duration: '105',
//       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam velit est aliquam. Obcaecati incidunt pariatur excepturi eum aliquam laborum dolorem eligendi! Facere tenetur voluptatibus, atque eveniet mollitia perferendis dolores qui.'
//     }];
//     const result = pipe.transform(courses, filterValue);
//     expect(result).toEqual(expectedCourses);
//   });

//   it('should be case-insensitive when filtering by title', () => {
//     const filterValue = 'course 3';
//     const expectedCourses = [    {
//       id: '456',
//       title: 'Video Course 3. Name tag',
//       topRated: false,
//       creationDate: '08/28/2020',
//       duration: '94',
//       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam velit est aliquam. Obcaecati incidunt pariatur excepturi eum aliquam laborum dolorem eligendi! Facere tenetur voluptatibus, atque eveniet mollitia perferendis dolores qui.'
//     }];
//     const result = pipe.transform(courses, filterValue);
//     expect(result).toEqual(expectedCourses);
//   });

//   it('should return an empty array when no courses match the filterValue', () => {
//     const filterValue = 'non-existing course';
//     const result = pipe.transform(courses, filterValue);
//     expect(result).toEqual([]);
//   });
// });
