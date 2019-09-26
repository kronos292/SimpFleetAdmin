import React, {Component} from 'react';
import MenuItem from "@material-ui/core/MenuItem";

import './JobItemInput.css'
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";

function createUOMList(uom, quantity){
    return {uom, quantity}
}

class JobItemInput extends Component {
    state = {
        priceList: [],
        UOMList:[],
    };

    componentDidMount() {
        if(this.props.type === "delivery") {
            axios.get(`/api/job_item_pricing`).then(res => {
                const priceList = res.data;
                const UOM = priceList.map(o => createUOMList(o.uom,0));
                this.setState({priceList: priceList, UOMList:UOM});
            }).catch(err => {
                console.log(err);
            });
        } else {
            axios.get(`/api/job_offland_item_pricing`).then(res => {
                const priceList = res.data;
                const UOM = priceList.map(o => createUOMList(o.uom,0));
                this.setState({priceList: priceList, UOMList:UOM});
            }).catch(err => {
                console.log(err);
            });
        }
    }

    onQuantityUpdate = (value, newProduct) => {
        value = Number(value);
        if (value > 0) {
            const products = this.props.jobItems;
            const newProducts = [];
            for (let i = 0; i < products.length; i++) {
                let product = products[i];
                if (product.id === newProduct.id) {
                    newProducts.push({
                        ...product,
                        quantity: value
                    });
                } else {
                    newProducts.push(product);
                }
            }
            this.props.setItems(newProducts);
        } else {
            const index = this.props.jobItems.indexOf(newProduct);
            this.props.jobItems.splice(index, 1);
            this.props.setItems(this.props.jobItems);
        }
    };

    handleAddEvent = (value, uom) => {
        let itemPrice = this.state.priceList.filter(o => {
            return o.uom === uom;
        })[0];
        const item = {
            quantity: Number(value),
            uom: uom,
            id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
            job: null,
            price: itemPrice.price,
        };
        const items = this.props.jobItems;
        items.push(item);
        this.props.setItems(this.props.jobItems);
    };

    render() {

        let jobItems = this.props.jobItems;

        const renderMenu = this.state.UOMList.map((item, index) => {
            const jobItemsUOM = jobItems.reduce((a, jobItem) => {
                a.push(jobItem.uom);
                return a;
            }, []);
            if (!jobItemsUOM.includes(item.uom)) {
                return (
                    <MenuItem button={false} key={index}>
                        <Row className='d-flex align-items-center'>
                            <Col xs={2}>
                                <h3 className='uom-label'>{item.uom}</h3>
                            </Col>
                            <Col xs={{span: 8, offset: 2}}>
                                <InputGroup className="ml-auto">
                                    <InputGroup.Prepend>
                                        <Button variant="outline-secondary" className='uom-minus-btn'><img
                                            src='/images/minus.png' alt='minus'/></Button>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        className='uom-input text-center'
                                        min="0" type='number' value={item.quantity}
                                        onChange={()=>{}}
                                        onKeyPress={e => {
                                            if (e.key === 'Backspace' && item.quantity === 0) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            } else if (/\d/.test(e.key)) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                this.handleAddEvent(parseInt(e.key), item.uom);
                                            }
                                        }}
                                    />
                                    <InputGroup.Append>
                                        <Button variant="outline-secondary" className='uom-plus-btn'
                                                onClick={e => {
                                                    this.handleAddEvent(item.quantity, item.uom);
                                                    const jobItemSelected = jobItems.filter(o => {
                                                        return o.uom === item.uom;
                                                    })[0];
                                                    this.onQuantityUpdate(1, jobItemSelected)
                                                }}>
                                            <img src='/images/plus.png' alt='plus'/>
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                        </Row>
                    </MenuItem>
                );
            } else {
                const jobItemSelected = jobItems.filter(o => {
                    return o.uom === item.uom;
                })[0];
                return (

                    <MenuItem button={false} key={index}>
                        <Row className='d-flex align-items-center'>
                            <Col xs={2}>
                                <h3 className='uom-label'>{item.uom}</h3>
                            </Col>
                            <Col xs={{span: 8, offset: 2}}>
                                <InputGroup className="ml-auto">
                                    <InputGroup.Prepend>
                                        <Button variant="outline-secondary" className='uom-minus-btn'
                                                onClick={e => {
                                                    this.onQuantityUpdate(parseInt(document.getElementById(`value${index}`).value) - 1, jobItemSelected)
                                                }}><img src='/images/minus.png' alt='minus'/></Button>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        id={`value${index}`}
                                        className='uom-input text-center'
                                        min="0" type='number' value={parseInt(jobItemSelected.quantity)}
                                        onChange={(e) => {
                                            this.onQuantityUpdate(parseInt(e.target.value), jobItemSelected);
                                        }}
                                        onKeyDown={e => {
                                            if (e.keyCode === 8) {
                                                if (jobItemSelected.quantity === 0) {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                } else if (jobItemSelected.quantity.toString().length === 1) {
                                                    this.onQuantityUpdate(0, jobItemSelected)
                                                }
                                            }
                                        }}
                                    />
                                    <InputGroup.Append>
                                        <Button variant="outline-secondary" className='uom-plus-btn'
                                                onClick={e => {
                                                    this.onQuantityUpdate(parseInt(document.getElementById(`value${index}`).value) + 1, jobItemSelected)
                                                }}><img src='/images/plus.png' alt='plus'/></Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                        </Row>
                    </MenuItem>
                )
            }

        });

        return (
            <Container className='popover-conatiner'>
                {renderMenu}
            </Container>
        );
    }
}

export default JobItemInput;