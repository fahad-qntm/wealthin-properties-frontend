const model = {
    loading: false,
    error: null,
    message: ''
}
const ListingModel = {
    fetchAllListings: model,
    fetchListing: model,
    addListing: model,
    editListing: model,
    deleteListing: model,
    listings: [],
    currentListing: null,
    editing: false,
    viewing: false
}

export default ListingModel