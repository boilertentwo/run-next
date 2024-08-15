export default function Itempage({params}){
    return(
        <>
            <h1>item showing : {params.itemID} from model : {params.modelID}</h1>
        </>
    )
}