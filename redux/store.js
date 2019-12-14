import {createStore} from 'redux';
import reducer from './reducer';

const initialState = {
  posts: [
    {
      id: 123124124,
      user_id: 1,
      images: [
        'https://freedesignfile.com/upload/2017/05/Sunrise-tropical-island-beach-view-HD-picture-01.jpg',
      ],
      title: 'Test A',
      description: 'Deskripsi A',
      categories: ['Category A'],
      product: ['Product A'],
      groups: ['Groups A'],
      stashes: ['Stash A'],
      likeCounter: 5,
      likeStatus: 0,
    },
    {
      id: 788976494,
      user_id: 1,
      images: [
        'https://freedesignfile.com/upload/2017/05/Sunrise-tropical-island-beach-view-HD-picture-01.jpg',
      ],
      title: 'Test B',
      description: 'Deskripsi B',
      categories: ['Category B'],
      product: ['Product B'],
      groups: ['Groups B'],
      stashes: ['Stash B'],
      likeCounter: 2,
      likeStatus: 0,
    },
    {
      id: 128673492,
      user_id: 2,
      images: [
        'https://s3.amazonaws.com/images.seroundtable.com/google-nyc-deck-vioew-1555500904.jpg',
      ],
      title: 'Test C',
      description: 'Deskripsi C',
      categories: ['Category C'],
      product: ['Product C'],
      groups: ['Groups C'],
      stashes: ['Stash C'],
      likeCounter: 3,
      likeStatus: 0,
    },
    {
      id: 128673493,
      user_id: 2,
      images: [
        'https://freedesignfile.com/upload/2017/05/Sunrise-tropical-island-beach-view-HD-picture-01.jpg',
      ],
      title: 'Test D',
      description: 'Deskripsi D',
      categories: ['Category D'],
      product: ['Product D'],
      groups: ['Groups D'],
      stashes: ['Stash D'],
      likeCounter: 3,
      likeStatus: 0,
    },
    {
      id: 128673494,
      user_id: 2,
      images: [
        'https://freedesignfile.com/upload/2017/05/Sunrise-tropical-island-beach-view-HD-picture-01.jpg',
      ],
      title: 'Test E',
      description: 'Deskripsi E',
      categories: ['Category E'],
      product: ['Product E'],
      groups: ['Groups E'],
      stashes: ['Stash E'],
      likeCounter: 3,
      likeStatus: 0,
    },
    {
      id: 128673495,
      user_id: 2,
      images: ['https://upload.wikimedia.org/wikipedia/en/d/dc/View_park.jpg'],
      title: 'Test F',
      description: 'Deskripsi F',
      categories: ['Category F'],
      product: ['Product F'],
      groups: ['Groups F'],
      stashes: ['Stash F'],
      likeCounter: 3,
      likeStatus: 0,
    },
  ],
  users: [
    {
      id: 1,
      picture:
        'http://www.evanto.online/wp-content/uploads/2018/03/dummy-profile-pic-1-370x370.jpg',
      name: 'Wonderland',
    },
    {
      id: 2,
      picture:
        'http://www.evanto.online/wp-content/uploads/2018/03/dummy-profile-pic-1-370x370.jpg',
      name: 'Alice',
    },
    {
      id: 4,
      picture:
        'http://www.evanto.online/wp-content/uploads/2018/03/dummy-profile-pic-1-370x370.jpg',
      name: 'john smith',
      liking: [{id: 123124124, status: 1}],
    },
  ],
  user: {
    id: 4,
    picture:
      'http://www.evanto.online/wp-content/uploads/2018/03/dummy-profile-pic-1-370x370.jpg',
    name: 'john smith',
    liking: [{id: 123124124, status: 1}],
  },
  liking: [],
  categories: [
    {label: 'Fashion', value: 'fashion'},
    {label: 'Beauty', value: 'beauty'},
    {label: 'Health', value: 'health'},
    {label: 'Home & Decor', value: 'home-decor'},
    {label: 'Babies & Kids', value: 'babies-kids'},
    {label: 'Home Appliances', value: 'home-appliances'},
    {label: 'Stationery', value: 'stationery'},
    {label: 'Electronics', value: 'electronics'},
    {label: 'Pets', value: 'pets'},
    {label: 'Sports', value: 'sports'},
    {label: 'Others', value: 'others'},
    {label: 'Food', value: 'food'},
    {label: 'Travel', value: 'travel'},
    {label: 'Life hacks', value: 'life-hacks'},
  ],
};

export default store = createStore(reducer, initialState);
