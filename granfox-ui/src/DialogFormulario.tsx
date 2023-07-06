import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input,} from "@material-tailwind/react";
import {useFormik} from "formik";
import {Produto} from "./Produto";
import axios from "axios";
import {useEffect, useState} from "react";

interface NovoProdutoProps {
    open: boolean;
    onClose: () => void;
}

const DialogFormulario: React.FC<NovoProdutoProps> = ({open, onClose}) => {

    const [produto, setProduto] = useState<Produto>();

    const initialValues: Produto = {
        nome: "",
        valor: 0
    }

    const formik = useFormik({
        initialValues,
        onSubmit: () => {
        },
        validateOnBlur: true,
        validateOnChange: true,
        validateOnMount: true,
    });

    const handleSubmit = (event: any) => {
        console.log("handle")
        event.preventDefault();

        formik.submitForm();

        if (!formik.dirty || !formik.isValid) {
            return;
        }

        const objectRequest = {
            nome: formik.values.nome,
            valor: formik.values.valor,
        };

        try {
            const response = axios.post('http://localhost:8100/produtos', objectRequest);
            response.then(res => onClose());
        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {
        formik.resetForm();
    }, []);

    return (
        <>
            <Dialog
                open={open}
                handler={onClose}
                animate={{
                    mount: {scale: 1, y: 0},
                    unmount: {scale: 0.9, y: -100},
                }}>
                <DialogHeader>Criar novo produto</DialogHeader>
                <DialogBody divider>
                    <div className="flex flex-row gap-4">
                        <Input
                            id="nome"
                            label="Nome"
                            size="lg"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            defaultValue={formik.values.nome}/>
                        <Input
                            id="valor"
                            label="Valor"
                            size="lg"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            defaultValue={formik.values.valor}/>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={onClose}
                        className="mr-1"
                    >
                        <span>Cancelar</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleSubmit}>
                        <span>Confirmar</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default DialogFormulario;