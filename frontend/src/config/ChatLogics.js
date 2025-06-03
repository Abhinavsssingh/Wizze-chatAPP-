export const getSender = (loggedUser,users) => {

    return users[0]._id === loggedUser.data.userId ? users[1].name : users[0].name
}

export const getSender_full = (loggedUser,users) => {
    return users[0]._id === loggedUser.data.userId ? users[1] : users[0].name
}