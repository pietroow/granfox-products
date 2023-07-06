import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    IconButton,
    Tooltip,
    Typography
} from "@material-tailwind/react";
import DialogFormulario from "./DialogFormulario";
import {PencilIcon} from "@heroicons/react/20/solid";

interface Pageable {
    content?: Produto[],
    totalElements?: number,
    totalPages?: number,
    pageable?: PageableProps,
    size?: number
}

interface PageableProps {
    pageNumber: number
}

interface Produto {
    id: string,
    nome: string,
    valor: number
}

interface RequestProps {
    page: number,
    orderBy: string,
    direction: string
}

const TABLE_HEAD = [
    {
        label: "Nome",
        name: "nome"
    },
    {
        label: "Valor",
        name: "valor"
    },
    {
        label: "",
        name: ""
    }
];

function PageProduto() {

    const [pageable, setPageable] = useState<Pageable>({});
    const [open, setOpen] = useState(false);

    const [requestProps, setRequestProps] = useState<RequestProps>({
        page: 0,
        orderBy: "id",
        direction: "ASC"
    });

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8100/produtos');
            console.log(response.data)
            setPageable(response.data);
        } catch (error) {
            console.error("Erro ao buscar dados", error);
        }
    };

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleClose = () => {
        setOpen(!open);
        fetchData();
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <DialogFormulario open={open} onClose={handleClose}/>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="flex items-center justify-between">
                        <Button color="blue" size="sm" onClick={handleOpen}>
                            Adicionar produto
                        </Button>
                    </div>
                </CardHeader>
                <CardBody className="overflow-hidden px-0">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={head.name}
                                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                                        {head.label}{" "}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                        </thead>

                        <tbody>
                        {pageable.content?.map((produto, index) => {
                            const isLast = index === pageable.content!.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={produto.id}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {produto.nome}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {produto.valor}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Tooltip content="Edit User">
                                            <IconButton variant="text" color="blue-gray">
                                                <PencilIcon className="h-4 w-4"/>
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </CardBody>

                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        Page {pageable.pageable?.pageNumber! + 1} of {pageable.totalPages}
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" color="blue-gray" size="sm">
                            Previous
                        </Button>
                        <Button variant="outlined" color="blue-gray" size="sm" onClick={() => {
                            const requestNum = requestProps;
                            requestNum.page++
                            setRequestProps(requestNum);
                            fetchData();
                        }}>
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </>

    );

}

export default PageProduto;
