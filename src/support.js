export const createTodayDate = () => {
    const date = new Date()
    const year = new Date(date).getFullYear();
    const month = (1 + new Date(date).getMonth()).toString().padStart(2, '0');
    const day = new Date(date).getDate().toString().padStart(2, '0');

    return month + '/' + day + '/' + year;
}

export const capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
}
