import { useState } from 'react';
import './usestateform.css';

export function Usestateform() {
    // const [fname, setFname] = useState("");
    // const [lname, setLname] = useState("");
    const [userDetails, setUserDetails] = useState({ fname: "", lname: "", email: "", subject: "" })
    const [data, setData] = useState(JSON.parse(localStorage.getItem("data")) || [])
    const [editIndex, setEditIndex] = useState("");
    const [isSortedAsc, setIsSortedAsc] = useState(true);
    const [search, setsearch] = useState("");
    const [selectedColumn, setSelectedColumn] = useState("fname");
    const [searchValue, setSearchValue] = useState("");
    const [selectedRecords, setSelectedRecords] = useState("");
    const [isAllChecked, setisAllChecked] = useState(false);

    const handleOnChange = (e) => {
        console.log(e.target.value, e.target.name);
        // destructuring 
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value })
    }
    const handleSubmit = () => {
        // setData([...data, userDetails]);
        // localStorage.setItem("data", JSON.stringify([...data, userDetails]))

        if (editIndex !== "") {
            const updateData = data.map((item, index) =>
                index === editIndex ? userDetails : item
            );
            setData(updateData);
            localStorage.setItem("data", JSON.stringify(updateData));
            setEditIndex("");
        } else {
            const updateData = [...data, userDetails];
            setData(updateData);
            localStorage.setItem("data", JSON.stringify(updateData));
        }
        setUserDetails({ fname: "", lname: "", email: "", subject: "" });
    }

    const handleDelete = (index) => {
        const updateData = data.filter((idx, i) => i !== index);
        setData(updateData);
        localStorage.setItem("data", JSON.stringify(updateData));
    }

    const handleEdit = (index) => {
        setUserDetails(data[index]);
        setEditIndex(index);
    }

    const handleSort = () => {
        const sortedData = [...data].sort((a, b) => {
            if (a.fname.toLowerCase() < b.fname.toLowerCase()) {

                return isSortedAsc ? -1 : 1;
            }
            if (a.fname.toLowerCase() > b.fname.toLowerCase()) {

                return isSortedAsc ? 1 : -1;
            }
            return 0;
        });
        setIsSortedAsc(!isSortedAsc);
        setData(sortedData);
    }

    const handleSearch = () => {
        const filteredData = data.filter(item => {
            return (
                item.fname.toLowerCase().includes(search.toLowerCase()) ||
                item.lname.toLowerCase().includes(search.toLowerCase()) ||
                item.email.toLowerCase().includes(search.toLowerCase()) ||
                item.subject.toLowerCase().includes(search.toLowerCase())
            );
        });
        setData(filteredData);
    }

    const sortTable = () => {
        const selectedColumn = document.getElementById("sortColumn").value;
        if (!selectedColumn) return;
        const sortedData = [...data].sort((a, b) => {
            if (a[selectedColumn].toLowerCase() < b[selectedColumn].toLowerCase()) {
                return isSortedAsc ? -1 : 1;
            }
            if (a[selectedColumn].toLowerCase() > b[selectedColumn].toLowerCase()) {

                return isSortedAsc ? 1 : -1;
            }
            return 0;
        });
        setIsSortedAsc(!isSortedAsc);
        setData(sortedData);
    }

    const searchTable = () => {
        const filteredData = data.filter((item) =>
            item[selectedColumn].toLowerCase().includes(searchValue.toLowerCase())
        );
        setData(filteredData);
    }

    const handleCheckboxChange = (index) => {
        const updatedSelectedRecords = selectedRecords.includes(index)
            ? selectedRecords.filter(i => i !== index)
            : [...selectedRecords, index];
        setSelectedRecords(updatedSelectedRecords);

        setisAllChecked(updatedSelectedRecords.length === data.length);

    }

    const handleAllCheckedChange = () => {
        if (isAllChecked) {
            setSelectedRecords("");
        } else {
            const allIndexes = data.map((i, index) => index);
            setSelectedRecords(allIndexes);
        }
        setisAllChecked(!isAllChecked);

    };

    const deleteSelectedRecords = (index) => {
        const updateData = data.filter((i, index) => !selectedRecords.includes(index));
        setData(updateData);
        localStorage.setItem("data", JSON.stringify(updateData));
        setSelectedRecords([]);
    }


    console.log(data);
    console.log(userDetails)
    // console.log(fname, lname)
    return (
        <>
            <div className="form1">
                <div className="form2">
                    <h1 className='have'>Have Question ? Get In Touch !</h1>
                    {/* <div className="aab">
                        <input className='inputwid' type="text" id="firstName" value={fname} name="fname" onChange={(e) => setFname(e.target.value)} placeholder="First Name" />
                        <input className='inputwid' type="text" id="lastName" name="lname" placeholder="Last Name" value={lname} onChange={(e) => setLname(e.target.value)} />
                    </div> */}
                    <div className='mainformb'>
                        <div className="aab">
                            <input className='inputwid' type='text' id='fname' value={userDetails.fname} onChange={(e) => handleOnChange(e)} name='fname' placeholder='Enter Firstname' />
                            <input className='inputwid' type='text' id='lname' value={userDetails.lname} onChange={(e) => handleOnChange(e)} name='lname' placeholder='Enter Lastname' />
                        </div>
                        <div>

                            <input className='inputwid' type="email" id="email" value={userDetails.email} onChange={(e) => handleOnChange(e)} name="email" placeholder="Email Address  " />
                        </div>
                        <div>
                            <input className='inputwid' type="text" id="subject" value={userDetails.subject} onChange={(e) => handleOnChange(e)} name="subject" placeholder=" Subject  " />
                        </div>
                        <div>
                            <textarea className='inputwid' rows="4" cols="20" name="comment" placeholder="Enter text here...">

                            </textarea>

                        </div>
                    </div>
                    <div className='mainbtns'>
                        <div className="btn09">
                            <button className='subbtn' onClick={() => handleSubmit()}>Submit Form</button>
                            <button className='subbtn' onClick={() => handleSort()}>Sort by Firstname</button>
                        </div>
                        <div className='sortselected'>
                            <select className='subbtn' id="sortColumn">
                                <option value="fname">Firstname</option>
                                <option value="lname">Lastname</option>
                                <option value="email">Email</option>
                                <option value="subject">Subject</option>

                            </select>
                            <button className='subbtn' onClick={() => sortTable()}>Sort</button>
                        </div>
                        <div className='seadiv'>
                            <input className='subbtn' value={search} onChange={(e) => setsearch(e.target.value)} type='text' placeholder='Search' />
                            <button className='subbtn' id='' onClick={handleSearch}>Search</button>
                        </div>
                        <div className='sortselected'>
                            <select className='subbtn' value={selectedColumn} onChange={(e) => setSelectedColumn(e.target.value)} >
                                <option value="fname">Firstname</option>
                                <option value="lname">Lastname</option>
                                <option value="email">Email</option>
                                <option value="subject">Subject</option>

                            </select>
                            <input className='subbtn' type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search..." />
                            <button className='subbtn' onClick={searchTable}>Search</button>
                        </div>
                        <div>
                            <button id='deletes' className='subbtn' onClick={deleteSelectedRecords}>Delete Selected</button>
                        </div>
                    </div>
                </div>
            </div >
            <div className='tbmain'>
                <table className='tablemain'>
                    <thead>
                        <tr>
                            <td className='tablebodyb'>Firstname</td>
                            <td className='tablebodyb'>Lastname</td>
                            <td className='tablebodyb'>Email</td>
                            <td className='tablebodyb'>Subject</td>
                            <td className='tablebodyb'>Delete</td>
                            <td className='tablebodyb'>Edit</td>
                            <div className='tablebodyb'>
                                <input type='checkbox' checked={isAllChecked} onChange={handleAllCheckedChange} /></div>
                        </tr>
                    </thead>
                    <tbody >
                        {data?.map((item, index) => {
                            return (
                                <tr className='tdborder'>
                                    <td className='tablebodyb3'>{item?.fname}</td>
                                    <td className='tablebodyb3'>{item?.lname}</td>
                                    <td className='tablebodyb3'>{item?.email}</td>
                                    <td className='tablebodyb3'>{item?.subject}</td>
                                    <td>
                                        <button className='tablebodyb1' onClick={() => handleDelete(index)}>Delete</button>
                                    </td>
                                    <td>
                                        <button className='tablebodyb2' onClick={() => handleEdit(index)}>Edit</button>
                                    </td>
                                    <td className='checked'>
                                        <input type='checkbox' checked={selectedRecords.includes(index)} onChange={() => handleCheckboxChange(index)} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );

}