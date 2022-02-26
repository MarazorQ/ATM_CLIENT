export interface IClient {
  first_name: string;
  last_name: string;
  third_name: string;
  date_born: string;
  sex: string;
  passport_series: string;
  passport_id: string;
  who_issued_the_passport: string;
  date_of_issue_of_the_passport: string;
  inspirational_passport_number: string;
  place_of_birth: string;
  city_of_residence: string;
  residential_address: string;
  mobile_phone: string;
  home_phone: string;
  email: string;
  work_place: string;
  position: string;
  place_of_registration: string;
  address_of_residence: string;
  marital_status: string;
  citizenship: string;
  disability: string;
  retiree: string;
  salary: string;
  liable_for_military_service: string;
}
export interface ICity {
  id: string;
  name: string;
}
