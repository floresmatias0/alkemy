import Swal from 'sweetalert2';
import styles from '../../styles/Home.module.css';

export const alertDeleteOperation = (logged,deleteOperation,operationId) => {
    if(logged){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#52C0F7',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteOperation(operationId)
                    Swal.fire({
                        icon:'success',
                        title: 'operation delete successfully',
                        confirmButtonColor: '#52C0F7',
                        confirmButtonText: 'Great!'
                    })
                }
            })  
    }else{
        Swal.fire({
            icon:'error',
            title: 'something went wrong',
            text: 'please login for delete operation'
        })
    }
}

export const alertUpdateOperation = (logged,putOperation,idOperation) => {

    if(logged){
        Swal.fire({
            html: `
            <div class=${styles.popUpEdit}>
                <input type="text" id="concept" placeholder="Concept">
                <input type="number" max="200000" id="mount" placeholder="Mount">
            </div>`,
            showCancelButton: true,
            confirmButtonText: 'Edit',
            cancelButtonColor: '#d33',
            focusConfirm: false,
            preConfirm: () => {
                const concept = Swal.getPopup().querySelector('#concept').value
                const mount = Swal.getPopup().querySelector('#mount').value
                if(concept && !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(concept)){
                Swal.fire({
                    icon:'error',
                    html: `<p>The concept can only contain letters and spaces</p>`,
                })
                }else if (concept || mount) {
                    putOperation(idOperation,concept,mount)
                    Swal.fire({
                        icon:'success',
                        title: 'operation update successfully',
                        confirmButtonColor: '#52C0F7',
                        confirmButtonText: 'Great!'
                    })
                }
            }
            })
    }else{
        Swal.fire({
            icon:'error',
            title: 'something went wrong',
            text: 'please login for delete operation'
        })
    }
}