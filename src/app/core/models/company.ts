export class Company {
    constructor(
        public name: string,
        public userName: string,
        public emailAddress: string,
        public taxNumber: string,
        public location: string,
        public id: number,
        public status: number,
        public phoneNumber?: string
    ) {}
}
