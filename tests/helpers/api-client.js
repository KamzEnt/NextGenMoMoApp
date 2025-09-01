class ApiClient {
    constructor(request) {
        this.request = request;
        this.baseUrl = 'https://ecwtest.mtnzambia.co.zm:8042/nextgenbusinessapp';
    }

    async addContact(contactRequest) {
        const response = await this.request.post(`${this.baseUrl}/addcontact`, {
            headers: {
                'Content-Type': 'application/xml',
                'Accept': 'application/xml'
            },
            data: contactRequest.toXML(),
            ignoreHTTPSErrors: true
        });

        return response;
    }
}

module.exports = ApiClient;
