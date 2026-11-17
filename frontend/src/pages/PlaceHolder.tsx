type PlaceHolderProps = {
    title: string;
}

function PlaceHolder({ title }: PlaceHolderProps) {
    return (
        <div>
            <h1>{title}</h1>
            <p>This page does not exist.....yet.</p>
        </div>
    );
}

export default PlaceHolder;