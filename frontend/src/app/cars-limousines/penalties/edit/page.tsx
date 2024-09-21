import { Card } from '@/components/ui/cards';
import { CardsContainer } from '@/components/ui/containers';
import Table, { Column, Row } from '@/components/ui/tables';
import EditIcon from '@/components/icons/editIcon';
import { RoundedButton } from '@/components/ui/buttons';
import AddIcon from '@/components/icons/addIcon';
import { title } from 'process';

export default function EditPage() {
    return (
        <section className="relative flex size-full flex-col items-center justify-center">
            <CardsContainer>
                <div className="relative grid size-full auto-rows-min grid-cols-1 justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    <Card
                        data={{
                            title: (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>PENALTIES DETAILS</span>
                                    <RoundedButton label={<EditIcon className="flex size-7 shrink-0 grow-0" />}
                                        className="group flex size-10 items-center justify-center rounded-full font-text text-2xl hover:fill-primary hover:text-primary">
                                    </RoundedButton>
                                </div>
                            ),
                        }}
                    >

                        <div>
                            <table style={{ marginLeft: 0, textAlign: 'left' }}>
                                <tr>
                                    <td><b>Type:</b></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><b>Location:</b></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><b>Infraction Number:</b></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><b>Car:</b></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><b>Created on:</b></td>
                                    <td></td>
                                </tr>
                            </table>
                        </div>
                    </Card>
                    <Card
                        data={{
                            title: (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>PAYMENT DETAILS</span>
                                    <RoundedButton label={<EditIcon className="flex size-7 shrink-0 grow-0" />}
                                        className="group flex size-10 items-center justify-center rounded-full font-text text-2xl hover:fill-primary hover:text-primary">
                                    </RoundedButton>
                                </div>
                            ),
                        }}
                    >
                        <div>
                            <table style={{ marginLeft: 0, textAlign: 'left' }}>
                                <tr>
                                    <td><b>Price:</b></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><b>Proof:</b></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><b>Status:</b></td>
                                    <td></td>
                                </tr></table></div>
                    </Card>
                    <Card
                        data={{
                            title: (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>DRIVER</span>
                                    <RoundedButton label={<EditIcon className="flex size-7 shrink-0 grow-0" />}
                                        className="group flex size-10 items-center justify-center rounded-full font-text text-2xl hover:fill-primary hover:text-primary">
                                    </RoundedButton>
                                </div>
                            ),
                        }}
                    >
                        <div>
                            <table style={{ marginLeft: 0, textAlign: 'left' }}>
                                <tr>
                                    <td><b>Presumed chauffeur:</b></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><b>Driven by:</b></td>
                                    <td></td>
                                </tr>
                            </table></div>
                    </Card>
                    <Card
                        data={{
                            title: (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>DOCUMENTS</span>
                                    <RoundedButton label={<EditIcon className="flex size-7 shrink-0 grow-0" />}
                                        className="group flex size-10 items-center justify-center rounded-full font-text text-2xl hover:fill-primary hover:text-primary">
                                    </RoundedButton>
                                </div>
                            ),
                        }}
                    >
                        <div>
                            <table style={{ marginLeft: 0, textAlign: 'left' }}>
                                <tr>
                                    <td><b>Penalty:</b></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><b>Invoice:</b></td>
                                    <td></td>
                                </tr>
                            </table>
                        </div>
                    </Card>
                </div>
            </CardsContainer>
        </section >
    );
}