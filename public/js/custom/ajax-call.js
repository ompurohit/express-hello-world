/**
 * Confirmation Pop up before click on delete button
 * @param {*} deletion_type 
 * @param {*} _id 
 */

// custom close button
const btnClose = '<span class="btn btn-sm btn-danger">close</span>'
// custom styles
function confirmation(deletion_type,_id){
	Swal.fire({
        title: 'Are you sure?',
        text: `You want to delete this ${deletion_type}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
        }).then(async(result) => {
        if (result.isConfirmed) {
            const responseData = await fetch(`/${deletion_type}/delete/${_id}`);
            const resultData = await responseData.json();
            Swal.fire({
                icon: resultData.status,
                title: resultData.data.title,
                text: resultData.message,
            }).then(()=>location.reload());
        }
    })
}