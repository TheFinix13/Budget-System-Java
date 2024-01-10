import axios from "axios";

const Backend = process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT;
// const Backend = "http://localhost:8080"

// console.log(Backend);

export class UserService {
    static addSuperAdmin(user) {
        return axios.post(`${Backend}/api/user/add_super_admin`, user);
    }

    static addAdmin(user) {
        return axios.post(`${Backend}/api/user/add_admin`, user);
    }

    static addApprovers(user) {
        return axios.post(`${Backend}/api/user/add_approve`, user);
    }

    static assignMinistryToAdmin(id, ministryId) {
        return axios.post(`${Backend}/api/user/assign_ministry_to_admin/${id}?ministryId=${ministryId}`);
    }

    static async assignApproverToMinistry(createdMinistryId) {
        return axios.post(`${Backend}/api/user/assign_approver_to_ministry/${createdMinistryId}`);
    }

    static async getMinistryIdFromAdminId(adminId) {
        return axios.get(`${Backend}/api/user/get_ministry_id/${adminId}`);
    }

    static updateProfilePhoto(id, profilePhoto){
        const headers = {
            'Content-Type': 'multipart/form-data', // Make sure to set the content type for uploading files
        };

        const formData = new FormData();
        formData.append('profilePhoto', profilePhoto);

        return axios.post(`${Backend}/api/user/uploadProfilePhoto/${id}`, profilePhoto, {
            headers: headers,
        });
    }

    static updateName(userId, nameDetails) {
        return axios.put(`${Backend}/api/admin/updateUsername/${userId}`, nameDetails);
    }

    static updateEmail(userId, emailDetails) {
        return axios.put(`${Backend}/api/admin/updateEmail/${userId}`, emailDetails);
    }

}

export class AdminService {
    static getAnAdmin(id) {
        return axios.get(`${Backend}/api/admin/getAnAdmin/${id}`);
    }

    static getAnApprover(id) {
        return axios.get(`${Backend}/api/admin/getAnApprover/${id}`);
    }

    static getAllAdmins() {
        return axios.get(`${Backend}/api/admin/getAllAdmins`);
    }

}

export class AuthService {
    static login(user) {
        return axios.post(`${Backend}/api/auth/login`, user);
    }

    // static logout() {
    //     return axios.get(`${Backend}/api/auth/logout`);
    // }
    //
    // static getCurrentUser() {
    //     return JSON.parse(localStorage.getItem('user'));;
    // }
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

    static getMinistryFromAdmin(id) {
        return axios.get(`${Backend}/api/ministry/get_ministry_from_admin/${id}`);
    }

    // static updateMinistry(id, param2) {
    //     return axios.put(`${Backend}/api/ministry/update_ministry`);
    //
    // }
    // static deleteMinistry(id) {
    //     return axios.delete(`${Backend}/api/ministry/update_ministry/${id}`);
    // }
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

    static getADepartment(department_id) {
        return axios.get(`${Backend}/api/department/get_a_department/${department_id}`);
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

    static getDivisionsInMinistry(id) {
        return axios.get(`${Backend}/api/ministry/get_divisions_in_ministry/${id}`);
    }
}

export class BudgetRequestServices {
    static addBudgetRequest(division_id, budgetRequest){
        return axios.post(`${Backend}/api/division_budget/create_budget/${division_id}`, budgetRequest);
    }

    static getBudgetRequestInDivision(division_id) {
        return axios.get(`${Backend}/api/division_budget/get_budget_requests/${division_id}`);
    }

    static getBudgetRequestInDepartment(department_id) {
        return axios.get(`${Backend}/api/division_budget/get_budget_requests_in_department/${department_id}`);
    }
    static getBudgetRequestInMinistry(ministry_id) {
        return axios.get(`${Backend}/api/division_budget/get_budget_requests_in_ministry/${ministry_id}`);
    }

    static getAllPendingRequests() {
        return axios.get(`${Backend}/api/division_budget/get_pending_requests`);
    }

    static getPendingRequestsInMinistry(ministry_id) {
        return axios.get(`${Backend}/api/division_budget/get_pending_requests_by_ministry/${ministry_id}`);
    }

    static async approveRequest(requestId) {
        return axios.put(`${Backend}/api/division_budget/approve_requests/${requestId}`);
    }

    static async denyRequest(requestId) {
        return axios.put(`${Backend}/api/division_budget/reject_requests/${requestId}`);
    }
    static getAllHandledRequests() {
        return axios.get(`${Backend}/api/division_budget/get_handled_requests`);
    }

    static getHandledRequestsInMinistry(ministry_id) {
        return axios.get(`${Backend}/api/division_budget/get_handled_requests_by_ministry/${ministry_id}`);
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

