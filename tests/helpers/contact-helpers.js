class AddContactRequest {
    constructor(fri, contactName, identificationType) {
        this.fri = fri;
        this.contactName = contactName;
        this.identificationType = identificationType;
    }

    toXML() {
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:addcontactrequest xmlns:ns2="http://www.ericsson.com/em/emm/contactlist/v1_1">
    <fri>${this.fri}</fri>
    <contactname>${this.contactName}</contactname>
    <contactdetails>
        <identificationtype>${this.identificationType}</identificationtype>
    </contactdetails>
</ns2:addcontactrequest>`;
    }

    static createDefault() {
        return new AddContactRequest(
            'FRI:260764730732/MSISDN',
            'tester',
            'passport'
        );
    }
}

class AddContactResponse {
    static isValid(responseText) {
        const requiredElements = [
            '<?xml version="1.0"',
            '<ns4:addcontactresponse',
            'xmlns:op="http://www.ericsson.com/em/emm/v1_0/common"'
        ];

        return requiredElements.every(element => responseText.includes(element));
    }
}

module.exports = {
    AddContactRequest,
    AddContactResponse
};
