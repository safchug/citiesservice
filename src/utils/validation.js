exports.fetchExistedData = (obj)=> {

    let {name, location, population, area, found} = obj;

    let updatedFildes = {};
    if (name) {
        updatedFildes.name = name;
    }
    if (location) {
        updatedFildes.location = location;
    }
    if (population) {
        updatedFildes.population = population;
    }
    if (area) {
        updatedFildes.area = area;
    }
    if (found) {
        updatedFildes.found = found;
    }

    return updatedFildes;
}

exports.isUpdateRequestPassedData = (obj) => {
    let {name, location, population, area, found} = obj;

    if(!name && !location && !population && !area && !found) {
        return false;
    }

    return true;
}