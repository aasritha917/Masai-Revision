export default function UserSelect({users,value,loading,onChange}){
    if(loading)
        return <p>Loading users.....</p>

    return(
        <select value={value} onChange={e =>onChange(e.target.value)}>
            <option value="">Select a user ....</option>
            {users.map(user =>(
                <option key={user.id} value={user.id}>
                    {user.name}
                </option>
            ))}
        </select>
    )
}