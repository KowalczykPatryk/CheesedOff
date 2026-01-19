

function Recipes()
{
    return (
        <>
            {Array.from({ length: 100 }).map((_, index) => (
                <div key={index}>Item {index + 1}</div>
            ))}
        </>
    )
}
export default Recipes