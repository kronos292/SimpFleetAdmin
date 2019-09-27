import React from 'react';
import MaterialTable, {MTableBodyRow, MTableHeader} from "material-table";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from '@material-ui/icons/Create';
import MoreIcon from '@material-ui/icons/MoreVert'
import ClearIcon from '@material-ui/icons/Clear';
import Dropdown from "react-bootstrap/Dropdown";
import LinesEllipsis from 'react-lines-ellipsis';
import SaveIcon from '@material-ui/icons/SaveAlt';
import PrintIcon from '@material-ui/icons/Print';


import './JobFileSummaryTable.css'
import JobFileModal from "./FilePreview/JobFileModal";

function createData(job, name, copies, requirement, remarks) {
    return {job, name, copies, requirement, remarks};
}

function retrieveRequirement(jobFile, key) {
    const {requirements} = jobFile;
    for (let i = 0; i < requirements.length; i++) {
        const requirement = requirements[i];
        if (requirement.key === key) {
            return requirement;
        }
    }

    const fullRequirements = this.loadRequirements();
    for (let i = 0; i < fullRequirements.length; i++) {
        const requirement = fullRequirements[i];
        if (requirement.key === key) {
            const jobFileRequirements = jobFile.requirements;
            jobFileRequirements.push(requirement);
            jobFile.requirements = jobFileRequirements;
            this.jobFileChange(jobFile);
            return requirement;
        }
    }
};


class JobFileSummaryTable extends React.Component {

    state = {
        data: [],
        hover: false,
        hoverKey: '',
        showDropdown: false,
        file:null,
        showModal:false,
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.refresh === true) {
            this.setState({data: [],});
            const rows = this.props.jobFiles.reduce((a, jobFile) => {
                let needPrintCopy = retrieveRequirement(jobFile, 'needPrintCopy').check;
                let signAndReturn = retrieveRequirement(jobFile, 'signAndReturn').check;
                let req = 'No Requirement';
                if (needPrintCopy && !signAndReturn) {
                    req = 'Need Printed Copy'
                }
                if (signAndReturn && !needPrintCopy) {
                    req = 'Sign and Return'
                }
                if (signAndReturn && needPrintCopy) {
                    req = "Need Printed Copy & Sign and Return"
                }
                a.push(createData(jobFile, jobFile.filename, jobFile.numCopies, req, jobFile.remarks));
                return a
            }, []);
            this.setState({data: rows})
        }
    }

    componentDidMount() {
        const rows = this.props.jobFiles.reduce((a, jobFile) => {
            let needPrintCopy = retrieveRequirement(jobFile, 'needPrintCopy').check;
            let signAndReturn = retrieveRequirement(jobFile, 'signAndReturn').check;
            let req = 'No Requirement';
            if (needPrintCopy && !signAndReturn) {
                req = 'Need Printed Copy'
            }
            if (signAndReturn && !needPrintCopy) {
                req = 'Sign and Return'
            }
            if (signAndReturn && needPrintCopy) {
                req = "Need Printed Copy & Sign and Return"
            }
            a.push(createData(jobFile, jobFile.filename, jobFile.numCopies, req, jobFile.remarks));
            return a
        }, []);
        this.setState({data: rows})
    }

    handleRowClick = (e, rd) => {
        if (rd.job.fileURL && rd.job.fileURL !== '') {
            this.setState({showModal:true,file:rd.job})
        }
    };

    toggleModal = (value) =>{
        this.setState({showModal:value})
    };

    handleDropdown = () => {
        this.setState({showDropdown: !this.state.showDropdown})
    };

    handleDownload = (job) => {
        if (job.fileURL !== '') {
            window.open(job.fileURL);
        }
    };

    render() {

        return (
            <div>
                <MaterialTable
                    columns={[
                        {
                            title: "Name", field: "name",
                            render: rowData => (
                                <LinesEllipsis
                                    text={rowData.name}
                                    maxLine='2'
                                    ellipsis='...'
                                    trimRight
                                    basedOn='letters'
                                />
                            ),
                        },
                        {
                            title: "Copies", field: "copies",
                            cellStyle: {width:"50px"}
                        },
                        {
                            title: "Requirements", field: "requirement",
                            disableClick: true,
                            render: rowData => (
                                <div className='d-flex align-items-center remarks-container'>
                                    <LinesEllipsis
                                        text={rowData.requirement}
                                        maxLine='2'
                                        ellipsis='...'
                                        trimRight
                                        basedOn='letters'
                                    />
                                    <div className='hover-buttons'>
                                        <IconButton onClick={() => {
                                            this.props.editFile(rowData.job);
                                        }}>
                                            <CreateIcon fontSize="small"/>
                                        </IconButton>
                                        <IconButton onClick={() => {
                                            this.props.deleteFile(rowData.job);
                                        }}>
                                            <ClearIcon fontSize="small"/>
                                        </IconButton>
                                        {/*<IconButton onClick={this.handleDropdown}>*/}
                                        {/*    <MoreIcon fontSize="small"/>*/}
                                        {/*</IconButton>*/}
                                        {/*<Dropdown show={this.state.showDropdown} alignRight drop='down'>*/}
                                        {/*    <Dropdown.Menu>*/}
                                        {/*        <Dropdown.Item onClick={() => {*/}
                                        {/*            this.handleDownload(rowData.job)*/}
                                        {/*        }}>Download</Dropdown.Item>*/}
                                        {/*        /!*<Dropdown.Item>Rename</Dropdown.Item>*!/*/}
                                        {/*    </Dropdown.Menu>*/}
                                        {/*</Dropdown>*/}
                                    </div>
                                </div>
                            )
                        },
                    ]}
                    data={this.state.data}
                    components={{
                        Container: props => (
                            <Paper {...props} elevation={0} style={{marginTop: '20px', minHeight: '60vh'}}/>
                        ),
                        Row: props => (
                            <MTableBodyRow {...props}
                                           // onMouseEnter={() => {
                                           //
                                           //     this.setState({hover: true, hoverKey: props.data.tableData.id})
                                           // }}
                                           // onMouseLeave={() => {
                                           //     this.setState({hover: false, hoverKey: '', showDropdown: false})
                                           // }}
                                           className='row-hover'
                            />
                        ),

                    }}
                    options={{
                        sorting: true,
                        selection: true,
                        headerStyle: {fontFamily: 'Roboto', fontSize: '16px', fontWeight: 'bold', color: '#707070'},
                        rowStyle: {fontFamily: 'Roboto', fontSize: '14px', color: '#707070', height: '69px',},
                        toolbarButtonAlignment: 'left',
                        showTextRowsSelected: false,

                    }}
                    onRowClick={this.handleRowClick}
                    title=''
                    actions={[
                        // {
                        //     tooltip: 'Download Selected Items',
                        //     icon: SaveIcon,
                        //     onClick: (evt, data) => alert('You want to download ' + data.length + ' rows'),
                        // },
                        {
                            tooltip: 'Delete Selected Items',
                            icon: ClearIcon,
                            onClick: (evt, data) => this.props.deleteMultipleFiles(data),
                        },
                        // {
                        //     tooltip: 'Print Selected Items',
                        //     icon: PrintIcon,
                        //     onClick: (evt, data) => alert('You want to Print ' + data.length + ' rows'),
                        // }
                    ]}
                />
                {this.state.data.length>0 && this.state.file !== null && (
                    <JobFileModal
                        file={this.state.file}
                        setModalFlag={value =>
                            this.toggleModal(value)
                        }
                        showPreviewModal={this.state.showModal}
                    />
                )}
            </div>


        );
    }
}

export default JobFileSummaryTable;