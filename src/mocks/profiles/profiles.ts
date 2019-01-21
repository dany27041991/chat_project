import { Profile } from "../../models/profile/profile.interface";

const userList: Profile[] = [
    {
        firstName: 'Chris',
        lastName: 'Evans',
        email: 'chris@evans.com',
        avatar: 'assets/imgs/chris.png',
        dateOfBirth: new Date(),
        mykey: '1'
    },
    {
        firstName: 'Sebastian',
        lastName: 'Stan',
        email: 'sebastian@stan.com',
        avatar: 'assets/imgs/sebastian.png',
        dateOfBirth: new Date(),
        mykey: '2'
    },
    {
        firstName: 'Jason',
        lastName: 'Momoa',
        email: 'jason@momoa.com',
        avatar: 'assets/imgs/jason.png',
        dateOfBirth: new Date(),
        mykey: '3'
    }
];

export const USER_LIST = userList;
