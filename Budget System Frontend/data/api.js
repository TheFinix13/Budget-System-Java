import axios from "axios";

const Backend = process.env.NEXT_PUBLIC_BackEndLocalHost;

// console.log(Backend);
export class UserService {
     static addUser(user) {
        return axios.post(`${Backend}/api/user/add_user`, user);
    }

    static login(user) {
        return axios.post(`${Backend}/api/user/login`, user);
    }
}

export class MinistryService {
     static addMinistry(ministry) {
        return axios.post(`${Backend}/api/ministry/add_ministry`, ministry);
    }

    static getMinistry() {
        return axios.get(`${Backend}/api/ministry/get_ministry`);
    }

    static getAMinistry(id) {
        return axios.get(`${Backend}/api/ministry/get_one_ministry/${id}`);
    }

    static updateMinistry(id, param2) {
        return axios.put(`${Backend}/api/ministry/update_ministry`);

    }
    static deleteMinistry(id) {
        return axios.delete(`${Backend}/api/ministry/update_ministry/${id}`);
    }
}

export class DepartmentService {
    static addDepartment(ministry_id, department) {
        return axios.post(`${Backend}/api/department/add_department/${ministry_id}`, department);
    }

    static getDepartmentInMinistry(ministry_id) {
        return axios.get(`${Backend}/api/department/get_department_in_ministry/${ministry_id}`);
    }

    static getAllDepartments() {
        return axios.get(`${Backend}/api/department/get_all_departments`);
    }

    // static updateDepartment(id, param2) {
    //     return axios.patch(`${Backend}/api/department/update_department`);
    //
    // }
    // static deleteDepartment(id) {
    //     return axios.delete(`${Backend}/api/department/update_department/${id}`);
    //
    // }
}

export class DivisionService {
    static addDivision(department_id, division){
        return axios.post(`${Backend}/api/division/add_division/${department_id}`, division);
    }

    static getDivisionInDepartment(department_id) {
        return axios.get(`${Backend}/api/division/get_division_in_department/${department_id}`);
    }

    static getAllDivisions() {
        return axios.get(`${Backend}/api/division/get_all_divisions`);
    }

}


export const sectors= [
    {id: 1, name: 'Agriculture and Rural Development'},
    {id: 2, name: 'Education'},
    {id: 3, name: 'Health'},
    {id: 4, name: 'Power'},
    {id: 5, name: 'Transportation'},
    {id: 6, name: 'Water Resources'},
    {id: 7, name: 'Works and Housing'},
    {id: 8, name: 'Environment'},
    {id: 9, name: 'Finance, Budget and Planning'},
    {id: 10, name: 'Foreign Affairs'},
    {id: 11, name: 'Communication and Digital Economy'},
    {id: 12, name: 'Industry, Trade and Investment'},
    {id: 13, name: 'Information and Culture'},
    {id: 14, name: 'Defence'},
    {id: 15, name: 'Labour and Employment'},
    {id: 16, name: 'Aviation'},
    {id: 17, name: 'Interior'},
    {id: 18, name: 'Petroleum Resources'},
    {id: 19, name: 'Science, Technology and Innovation'},
    {id: 20, name: 'Woman Affairs and Social Development'},
    {id: 21, name: 'Youth and Sports'},
];

// export {UserService, MinistryService, DepartmentService}