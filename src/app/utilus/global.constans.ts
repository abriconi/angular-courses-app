  import { Authors, COURSE_MODEL } from './global.moduls';

  export const authorsMockedData: Authors[]  = [
    {
      id: 1,
      name:' author test 1',
    },
    {
      id: 2,
      name:' author test 2',
    },
    {
      id: 3,
      name:' author test 3',
    },
  ]

 export const coursesMockedData: COURSE_MODEL[] = [
  {
    id: 123,
    name: 'Video Course 1. Name tag',
    isTopRated: true,
    date: '05/30/2023',
    length: 88,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam velit est aliquam. Obcaecati incidunt pariatur excepturi eum aliquam laborum dolorem eligendi! Facere tenetur voluptatibus, atque eveniet mollitia perferendis dolores qui.',
    authors: [authorsMockedData[0], authorsMockedData[2]]
  },
  {
    id: 345,
    name: 'Video Course 2. Name tag',
    isTopRated: true,
    date: '08/28/2023',
    length: 105,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam velit est aliquam. Obcaecati incidunt pariatur excepturi eum aliquam laborum dolorem eligendi! Facere tenetur voluptatibus, atque eveniet mollitia perferendis dolores qui.',
    authors: [authorsMockedData[1], authorsMockedData[2]]
  },
  {
    id: 456,
    name: 'Video Course 3. Name tag',
    isTopRated: false,
    date: '08/28/2020',
    length: 94,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam velit est aliquam. Obcaecati incidunt pariatur excepturi eum aliquam laborum dolorem eligendi! Facere tenetur voluptatibus, atque eveniet mollitia perferendis dolores qui.',
    authors: [authorsMockedData[0], authorsMockedData[2]]
  }
];

