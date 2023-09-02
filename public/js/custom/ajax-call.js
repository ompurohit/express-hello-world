import PopupManager from 'https://cdn.jsdelivr.net/gh/jorgeabrahan/popup_library@67068b1/popup/Popup.js'
/**
 * Confirmation Pop up before click on delete button
 * @param {*} deletion_type 
 * @param {*} _id 
 */

// custom close button
const btnClose = '<span class="btn btn-sm btn-danger">close</span>'
// custom styles
// const style = 'border-width: 2px; border-style: solid; border-color: gray'/
// init
const Popup = new PopupManager({ btnClose })

function confirmation(deletion_type,_id){
    Popup.display({
    title: 'Delete file',
    content: `Are you sure you want to delete this issue?`,
    buttons: {
        elements: [
        { text: 'Confirm', type: 'confirm', handler: onFileDelete },
        { text: 'Cancel', type: 'error', handler: () => ConfirmationPopup.close() }
        ]
    }
    })
    // const result = confirm("Are you sure you want to delete?");
    // if(result){
    console.log("Deleted", _id, deletion_type);
    //  href="/issues/delete/<%= item._id %>" 
    // }
}