const fs = require('fs')

module.exports = (config) => {
    const content = `
        <wsdl:definitions xmlns:xsd="http://www.w3.org/2001/XMLSchema"
            xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"
            xmlns:tns="http://webservice/"
            xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
            xmlns:ns1="http://schemas.xmlsoap.org/soap/http" name="TestClassService" targetNamespace="http://webservice/">
        <wsdl:types>
            <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
            xmlns:tns="http://webservice/" elementFormDefault="unqualified" targetNamespace="http://webservice/" version="1.0">
            </xs:schema>
        </wsdl:types>
            ${config.func.map(i => {
        return `
                        <wsdl:message name="${i}">
                            <wsdl:part element="tns:${i}" name="parameters"></wsdl:part>
                        </wsdl:message>
                        <wsdl:message name="${i}Response">
                            <wsdl:part element="tns:${i}Response" name="parameters"></wsdl:part>
                        </wsdl:message>
                    `
    }).join("")}
        <wsdl:portType name="${config.servicesName}">
            ${config.func.map(i => {
        return `
                    <wsdl:operation name="${i}">
                        <wsdl:input message="tns:${i}" name="${i}"></wsdl:input>
                        <wsdl:output message="tns:${i}Response" name="${i}Response"></wsdl:output>
                    </wsdl:operation>
                `
    }).join("")}
        </wsdl:portType>
        <wsdl:binding name="${config.servicesName}SoapBinding" type="tns:${config.servicesName}">
            <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
        </wsdl:binding>
        <wsdl:service name="${config.servicesName}">
            <wsdl:port binding="tns:${config.servicesName}SoapBinding" name="${config.portName}">
            <soap:address location="http://${config.ip}:${config.port}${config.url}"/>
            </wsdl:port>
        </wsdl:service>
        </wsdl:definitions>
`;

    try {
        fs.writeFileSync(config.path, content)
    } catch (err) {
        console.error(err)
    }
}



