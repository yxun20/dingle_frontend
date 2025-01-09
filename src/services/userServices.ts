import httpClient from '@/lib/client/http-client';
import axios from 'axios';

export const fetchUserData = async () : Promise<{
    baby: { babyName: string; birthDate: string };
    parentContacts: { momPhoneNumber: string; dadPhoneNumber: string };
  }>=> {
  //const response = await httpClient.get('/users/me');
  const response = await axios.get('http://localhost:3003/user');
  return response.data;
};

export const updateUserData = async (data: any) => {
  //const response = await httpClient.put('/users/me', data);
  const response = await axios.put('http://localhost:3003/user',data);
  return response.data;
};
