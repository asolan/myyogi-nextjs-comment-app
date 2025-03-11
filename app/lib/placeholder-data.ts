// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data

const users = [
  {
    ID: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];


const customers = [
  {
    ID: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Andrew Solan',
    email: 'andrewsolan@gmail.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    ID: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Vairagi Waldron',
    email: 'kyenwaldron@yahoo.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    ID: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Hriman McGilloway',
    email: 'hriman@ananda.com',
    image_url: '/customers/lee-robinson.png',
  },
];

const quotes = [
  {
    ID: 'be262b79-b4b4-4392-b15d-e9145d1f46b6',
    customerID: customers[0].ID,
    chapterNum: 1,
    paragraphNum: 1,
    posStart: 0,
    posEnd: 100,
    isActive: true,
    created: '2022-11-14'
  },
  {
    ID: '9935a73b-8dc2-47d0-b37a-bf7dadd6b28b',
    customerID: customers[0].ID,
    chapterNum: 2,
    paragraphNum: 1,
    posStart: 0,
    posEnd: 100,
    isActive: true,
    created: '2022-11-14'
  },
  {
    ID: '697c8aa6-cf8e-4c39-a1db-581649af19e3',
    customerID: customers[1].ID,
    chapterNum: 3,
    paragraphNum: 1,
    posStart: 0,
    posEnd: 100,
    isActive: true,
    created: '2022-11-14'
  },
  {
    ID: 'f8b63fb0-2634-45d7-9f0c-e6ecb7047dee',
    customerID: customers[1].ID,
    chapterNum: 4,
    paragraphNum: 1,
    posStart: 0,
    posEnd: 100,
    isActive: true,
    created: '2022-11-14'
  },
  {
    ID: '37963ed8-e862-487d-9581-c3461706f2a5',
    customerID: customers[1].ID,
    chapterNum: 5,
    paragraphNum: 1,
    posStart: 0,
    posEnd: 100,
    isActive: true,
    created: '2022-11-14'
  },
  {
    ID: '4cb272c8-4bd6-4362-9b53-0442f3e0d353',
    customerID: customers[2].ID,
    chapterNum: 6,
    paragraphNum: 1,
    posStart: 0,
    posEnd: 100,
    isActive: true,
    created: '2022-11-14'
  },
  {
    ID: 'b7c1142a-3b74-4e3e-9787-f65a885673c4',
    customerID: customers[2].ID,
    chapterNum: 7,
    paragraphNum: 1,
    posStart: 0,
    posEnd: 100,
    isActive: true,
    created: '2022-11-14'
  },
  {
    ID: 'd67ee7ec-aee5-43ac-bc1c-b5906549ddb2',
    customerID: customers[0].ID,
    chapterNum: 8,
    paragraphNum: 1,
    posStart: 0,
    posEnd: 100,
    isActive: true,
    created: '2022-11-14'
  },
  {
    ID: '5325b709-0006-4511-b698-dc5dc04596de',
    customerID: customers[0].ID,
    chapterNum: 9,
    paragraphNum: 1,
    posStart: 0,
    posEnd: 100,
    isActive: true,
    created: '2022-11-14'
  },
  {
    ID: '557f2167-8074-4b5f-87ea-7ca6b8828173',
    customerID: customers[1].ID,
    chapterNum: 10,
    paragraphNum: 1,
    posStart: 0,
    posEnd: 100,
    isActive: true,
    created: '2022-11-14'
  },
  {
    ID: 'afb0cc66-295d-4796-86d7-b88aadc706e7',
    customerID: customers[1].ID,
    chapterNum: 11,
    paragraphNum: 1,
    posStart: 0,
    posEnd: 100,
    isActive: true,
    created: '2022-11-14'
  },
  {
    ID: '8b2cc284-7f3c-4bd8-9fd3-0feeaede1775',
    customerID: customers[2].ID,
    chapterNum: 12,
    paragraphNum: 1,
    posStart: 0,
    posEnd: 100,
    isActive: true,
    created: '2022-11-14'
  },
  {
    ID: 'd1dd6b15-0fca-4ee4-a5c1-0f7b6349c51b',
    customerID: customers[2].ID,
    chapterNum: 13,
    paragraphNum: 1,
    posStart: 0,
    posEnd: 100,
    isActive: true,
    created: '2022-11-14'
  },
];

const notes = [
  {
    ID: '557b9fbc-cc51-47cd-b7be-70814c347cea',
    customerID: customers[0].ID,
    quoteID: quotes[0].ID,
    title: 'title 1',
    details: 'details 1',
    created: '2022-11-14',
    updated: '2022-11-14',
    isActive: true,
  },
  {
    ID: 'ceebe5d4-0454-48f8-a016-2e1d0ed50053',
    customerID: customers[0].ID,
    quoteID: quotes[1].ID,
    title: 'title 2',
    details: 'details 2',
    created: '2022-11-14',
    updated: '2022-11-14',
    isActive: true,
  },
  {
    ID: '9865226a-8a5d-4d6b-a930-ff23d87dd154',
    customerID: customers[0].ID,
    quoteID: quotes[2].ID,
    title: 'title 3',
    details: 'details 3',
    created: '2022-11-14',
    updated: '2022-11-14',
    isActive: true,
  },
  {
    ID: '173e1244-d639-455e-ba09-06d743cf0cdd',
    customerID: customers[1].ID,
    quoteID: quotes[3].ID,
    title: 'title 4',
    details: 'details 4',
    created: '2022-11-14',
    updated: '2022-11-14',
    isActive: true,
  },
  {
    ID: '2200e1c3-171b-4379-8b53-4d1ce49b93b9',
    customerID: customers[1].ID,
    quoteID: quotes[4].ID,
    title: 'title 5',
    details: 'details 5',
    created: '2022-11-14',
    updated: '2022-11-14',
    isActive: true,
  },
  {
    ID: '952222ab-9201-4e0b-9169-8cb007e6e399',
    customerID: customers[1].ID,
    quoteID: quotes[5].ID,
    title: 'title 6',
    details: 'details 6',
    created: '2022-11-14',
    updated: '2022-11-14',
    isActive: true,
  },
  {
    ID: '9de7fe3e-98b6-49f9-ad9c-ad1c93309ef9',
    customerID: customers[2].ID,
    quoteID: quotes[5].ID,
    title: 'title 7',
    details: 'details 7',
    created: '2022-11-14',
    updated: '2022-11-14',
    isActive: true,
  },
  {
    ID: '477af764-b358-4cc0-a430-5b61c32a2dd4',
    customerID: customers[2].ID,
    quoteID: quotes[6].ID,
    title: 'title 8',
    details: 'details 8',
    created: '2022-11-14',
    updated: '2022-11-14',
    isActive: true,
  },
  {
    ID: '8fb28e7e-bb62-46d0-b13a-6a9257873b5c',
    customerID: customers[2].ID,
    quoteID: quotes[7].ID,
    title: 'title 9',
    details: 'details 9',
    created: '2022-11-14',
    updated: '2022-11-14',
    isActive: true,
  },

];

const votes = [
  {
    ID: '819812e3-a20d-4237-8b62-81197aeecc75',
    noteID: notes[0].ID,
    customerID: customers[0].ID,
    created: '2022-11-14',
    details: ''
  },
  {
    ID: '7afc04b7-b7fe-49b8-a5e2-df752177ea9d',
    noteID: notes[1].ID,
    customerID: customers[0].ID,
    created: '2022-11-14',
    details: ''
  },
  {
    ID: '177abc28-5c85-4014-8970-80f74c13affd',
    noteID: notes[2].ID,
    customerID: customers[0].ID,
    created: '2022-11-14',
    details: ''
  },
  {
    ID: 'b4d22b9a-9f2f-4f97-9da6-1ae06c88134f',
    noteID: notes[3].ID,
    customerID: customers[0].ID,
    created: '2022-11-14',
    details: ''
  },
  {
    ID: '039edc43-1ff4-4114-bbc6-13875b5c8ea8',
    noteID: notes[4].ID,
    customerID: customers[0].ID,
    created: '2022-11-14',
    details: ''
  },
  {
    ID: 'a749c34d-156b-4076-ba01-d2aefe3e32b0',
    noteID: notes[5].ID,
    customerID: customers[0].ID,
    created: '2022-11-14',
    details: ''
  },
  {
    ID: '6cdb9701-6f2e-439a-be42-ca6b83e347c3',
    noteID: notes[6].ID,
    customerID: customers[0].ID,
    created: '2022-11-14',
    details: ''
  },
  {
    ID: '97eac8b8-27f1-4966-80c2-cc8cb78179e5',
    noteID: notes[7].ID,
    customerID: customers[0].ID,
    created: '2022-11-14',
    details: ''
  },
  {
    ID: '848812da-cb0b-4df1-9255-f6fc8e85f333',
    noteID: notes[8].ID,
    customerID: customers[0].ID,
    created: '2022-11-14',
    details: ''
  },
  {
    ID: '9b777249-19b8-49f7-b669-46c575213430',
    noteID: notes[8].ID,
    customerID: customers[1].ID,
    created: '2022-11-14',
    details: ''
  },
];

export { users, customers, quotes, notes, votes };
