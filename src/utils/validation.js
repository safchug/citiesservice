exports.fetchExistedData = (obj)=> {

    let {name, location, population, area, found} = obj;

    let updatedFildes = {};
    if (name) {
        updatedFildes.name = name;
    } else if (location) {
        updatedFildes.location = location;
    } else if (population) {
        updatedFildes.population = population;
    } else if (area) {
        updatedFildes.area = area;
    } else if (found) {
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