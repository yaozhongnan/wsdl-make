const make = require("../index");
const path = require("path");

const config = {
    func: ["jobOrderSend1", "jobOrderSend2", "jobOrderSend3", "jobOrderSend4", "jobOrderSend5"],
    servicesName: "TestClassService",
    portName: "TestClassPort",
    url: "/liku",
    port: 7300,
    ip: "127.0.0.1",
    path: path.resolve(__dirname, "./test.wsdl")
}

make(config)