import { type ReactNode, useState } from "react";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { alterarStatusOrdem, cancelarOrdem } from "@/services/orders";
import { ExcludedDialog } from "./excluded-dialog";
import { ForwadedDialog } from "./forwarded-dialog";
import { Button } from "./ui/button";

interface Props {
	Trigger: ReactNode;
	Category: string;
	Local: string;
	Reference: string;
	Problem: string;
	RequestDate: string;
	ConclusionDate: string;
	State?: string | undefined;
	CPF: string;
	Name: string;
	Number: string;
	Variant: "newOS" | "OSInProgess" | "default";
	ImgURL?: string | undefined;
	IdOrdem?: number;
	onStatusChange?: () => void;
}

export function OsDescDialog({
	Category,
	Local,
	Reference,
	Problem,
	RequestDate,
	State,
	Trigger,
	CPF,
	Variant,
	Name,
	Number,
	IdOrdem,
	onStatusChange,
}: Props) {
	const [open, setOpen] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [openForwardedDialog, setOpenForwardedDialog] = useState(false);
	const [openExcludedDialog, setOpenExcludedDialog] = useState(false);
	const [loading, setLoading] = useState(false);
	const [justificativa, setJustificativa] = useState("");

	const handleAlterarStatus = async (
		novoStatus: "PENDENTE" | "EM_EXECUCAO" | "CONCLUIDO",
	) => {
		if (!IdOrdem) {
			toast.error("ID da ordem não encontrado");
			return;
		}

		try {
			setLoading(true);
			await alterarStatusOrdem({
				id_ordem: IdOrdem,
				status: novoStatus,
			});
			setOpen(false);
			if (novoStatus === "EM_EXECUCAO") {
				setOpenForwardedDialog(true);
			}
			if (onStatusChange) {
				onStatusChange();
			} else {
				window.location.reload();
			}
		} catch (error) {
			const mensagem =
				error instanceof Error ? error.message : "Erro ao alterar status";
			toast.error(mensagem);
		} finally {
			setLoading(false);
		}
	};

	const handleEncaminhar = () => {
		handleAlterarStatus("EM_EXECUCAO");
	};

	const handleConcluir = () => {
		handleAlterarStatus("CONCLUIDO");
	};

	const handleExcluir = async () => {
		if (!IdOrdem) {
			toast.error("ID da ordem não encontrado");
			return;
		}

		if (!justificativa.trim()) {
			toast.error("É necessário informar uma justificativa para excluir");
			return;
		}

		try {
			setLoading(true);
			await cancelarOrdem({
				id_ordem: IdOrdem,
				justificativa: justificativa.trim(),
			});
			setOpenDeleteDialog(false);
			setOpen(false);
			setJustificativa("");
			setOpenExcludedDialog(true);
			if (onStatusChange) {
				onStatusChange();
			} else {
				window.location.reload();
			}
		} catch (error) {
			const mensagem =
				error instanceof Error ? error.message : "Erro ao cancelar ordem";
			toast.error(mensagem);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{Trigger}</DialogTrigger>
			<DialogContent
				className={cn(
					"overflow-x-hidden flex p-0 max-h-[80dvh] lg:max-h-[95dvh]",
					"text-seinfra-blue-light-700 bg-transparent rounded-tl-xl rounded-bl-xl outline-none shadow-sm border-transparent",
				)}
				showCloseButton={false}
			>
				<div className="flex w-full h-full overflow-hidden bg-white gap-2">
					<div
						className={cn(
							"bg-gray-500",
							`${State === "Finalizada" && "bg-seinfra-green-500"}`,
							`${State === "Em execução" && "bg-seinfra-yellow-500"}`,
							`${Variant === "newOS" && "bg-seinfra-blue-light-600-60"}`,
							`${State === "Excluída" && "bg-red-500"}`,
							"text-transparent",
							"w-4 shrink-0",
						)}
					/>
					<div className="w-full">
						<div
							className={cn(
								"px-3 py-4 font-semibold",
								"flex gap-8 flex-col grow text-sm text-seinfra-blue-light-700-50",
							)}
						>
							<DialogHeader>
								<div className="flex flex-col gap-4 justify-center items-center">
									<DialogTitle className="flex justify-center gap-8">
										{Variant !== "newOS" && (
											<div
												className={cn(
													"bg-gray-500 py-2 px-4 absolute right-5 self-start",
													`${State === "Finalizada" && "bg-seinfra-green-500"}`,
													`${State === "Excluída" && "bg-red-500"}`,
													`${State === "Em execução" && "bg-seinfra-yellow-500 px-2"}`,
													"text-white text-xs rounded-sm ",
												)}
											>
												{State}
											</div>
										)}
									</DialogTitle>
									<DialogDescription className="self-start">
										<div className="flex text-seinfra-blue-light-700-50 flex-col gap-2 text-sm md:text-md xl:text-lg">
											<h3>
												<span className="text-seinfra-blue-light-700-70">
													Nome:{" "}
												</span>
												{Name}
											</h3>
											<h3>
												<span className="text-seinfra-blue-light-700-70">
													Número:{" "}
												</span>
												{Number}
											</h3>
											<h3>
												<span className="text-seinfra-blue-light-700-70">
													CPF:{" "}
												</span>
												{CPF}
											</h3>
										</div>
									</DialogDescription>
								</div>
							</DialogHeader>

							<div className="flex flex-col flex-1 gap-8 break-all">
								<div className="flex flex-col gap-2 text-sm md:text-md xl:text-lg">
									<h3>
										<span className="text-seinfra-blue-light-700-70">
											Categoria:{" "}
										</span>
										{Category}
									</h3>
									<h3>
										<span className="text-seinfra-blue-light-700-70">
											Endereço:{" "}
										</span>
										{Local}
									</h3>
									<h3>
										<span className="text-seinfra-blue-light-700-70">
											Ponto de referência:{" "}
										</span>
										{Reference}
									</h3>
								</div>

								<DialogFooter>
									<div className="flex flex-col gap-18 justify-center w-full">
										<div className="flex flex-col gap-8">
											<div className="shrink flex flex-col gap-2 text-sm">
												<p>
													<span className="text-seinfra-blue-light-700-70">
														Descrição:{" "}
													</span>
													{Problem}
												</p>
											</div>
											<div className="flex flex-col gap-2 text-sm">
												<p>
													<span className="text-seinfra-blue-light-700-70">
														Data de solicitação:{" "}
													</span>
													{RequestDate}
												</p>
											</div>
										</div>
										{Variant !== "default" && (
											<div className="flex gap-12 justify-center items-center">
												<Button
													onClick={() => setOpenDeleteDialog(true)}
													disabled={loading || !IdOrdem}
													className={cn(
														"w-auto! flex-1",
														State === "Finalizada" && "bg-red-500",
														State === "Em execução" && "bg-red-500",
														State === "Excluída" && "bg-red-500",
														Variant === "newOS" && !State && "bg-red-500",
														Variant === "OSInProgess" &&
															"bg-red-500 hover:bg-red-600",
														!State &&
															Variant !== "newOS" &&
															"bg-red-500 hover:bg-red-600",
													)}
												>
													Cancelar
												</Button>
												<Button
													onClick={
														Variant === "newOS"
															? handleEncaminhar
															: handleConcluir
													}
													disabled={loading || !IdOrdem}
													className={cn(
														"w-auto! flex-1",
														State === "Finalizada" && "bg-seinfra-green-500",
														State === "Em execução" && "bg-seinfra-yellow-500",
														State === "Excluída" && "bg-red-500",
														Variant === "newOS" &&
															!State &&
															"bg-seinfra-blue-light-600-60",
														Variant === "OSInProgess" &&
															"bg-seinfra-green-500 hover:bg-seinfra-green-600",
														!State &&
															Variant !== "newOS" &&
															"bg-seinfra-blue-light-700-70",
													)}
												>
													{Variant === "newOS" && "Encaminhar"}
													{Variant === "OSInProgess" && "Concluir"}
												</Button>
											</div>
										)}
									</div>
								</DialogFooter>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>

			<Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>Confirmar cancelamento</DialogTitle>
						<DialogDescription>
							Tem certeza que deseja cancelar esta ordem de serviço? Esta ação
							não pode ser desfeita.
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-4 py-4">
						<div className="flex flex-col gap-2">
							<label className="text-sm font-medium text-seinfra-blue-light-700-70">
								Justificativa <span className="text-red-500">*</span>
							</label>
							<textarea
								value={justificativa}
								onChange={(e) => setJustificativa(e.target.value)}
								placeholder="Informe o motivo do cancelamento..."
								className={cn(
									"min-h-20 w-115 px-3 py-2 rounded-md border border-input",
									"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
									"text-sm resize-none outline-none",
								)}
								disabled={loading}
							/>
						</div>
					</div>
					<DialogFooter>
						<div className="flex gap-3 w-100 justify-center items-center">
							<Button
								type="button"
								onClick={() => {
									setOpenDeleteDialog(false);
									setJustificativa("");
								}}
								disabled={loading}
								className="!w-40"
							>
								Cancelar
							</Button>
							<Button
								type="button"
								onClick={handleExcluir}
								disabled={loading || !justificativa.trim()}
								className="!w-fit bg-red-500 hover:bg-red-600 text-white mr-15"
							>
								{loading ? "Cancelando..." : "Confirmar cancelamento"}
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<ForwadedDialog
				open={openForwardedDialog}
				onOpenChange={setOpenForwardedDialog}
			/>

			<ExcludedDialog
				open={openExcludedDialog}
				onOpenChange={setOpenExcludedDialog}
			/>
		</Dialog>
	);
}
