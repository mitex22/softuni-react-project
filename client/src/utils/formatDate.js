export const formatDate = (isoDate) => {
    // Create a Date object from the ISO date string
    const date = new Date(isoDate);

    // Define options for toLocaleDateString
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    // Convert the date to the desired format
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
}