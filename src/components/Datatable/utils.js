export const getInputType = (type) => {
    switch(type){
        case "date":
            return "date";
        case "datetime":
            return "datetime-local";
        default: return "text";
    }
};

export const convertToType = (value, type) => {
    switch(type){
        case "int":
            return parseInt(value);
        case "float": 
            return parseFloat(value);
        case "date":
        case "datetime":
            return new Date(value);
        case "string":
        default:
            return String(value);
    }
}