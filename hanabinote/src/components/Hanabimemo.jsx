// src/components/Hanabimemo.jsx

import { useState } from "react";
import {
	createInitialHand,
	updateCardSelection,
	applyHintToHand,
	playCardFromHand,
} from "../logic/hanabiUtils";

const HanabiMemo = () => {
	const [hand, setHand] = useState(createInitialHand());

	const handleSelect = (index) => {
		setHand(updateCardSelection(hand, index));
	};

	const applyHint = (type, value) => {
		setHand(applyHintToHand(hand, type, value));
	};

	const playCard = (index) => {
		setHand(playCardFromHand(hand, index));
	};

	const colorMap = {
		赤: "red",
		青: "blue",
		緑: "green",
		黄: "gold",
		白: "gray",
	};

	return (
		<div className="container py-3">
			<h2 className="mb-4">花火のヒントをメモするサイト</h2>
			<div className="d-flex flex-row overflow-auto gap-3 pb-2">
				{hand.map((card, i) => (
					<div
						key={i}
						style={{
							minWidth: "100px",
							flex: "0 0 auto",
						}}
					>
						<div className="card h-100 shadow-sm">
							<div className="card-header">
								ID: {String(card.id).padStart(2, "0")}
							</div>
							<div className="card-body">
								<div className="row mb-4">
									<div className="col-6">
										<div className="mb-2">
											<strong>色ヒント</strong>
											<div
												className="mt-1"
												style={{
													display: "grid",
													gridTemplateColumns:
														"repeat(1, 1fr)",
													gap: "0.1rem",
												}}
											>
												{Object.keys(colorMap).map(
													(c) => {
														const status =
															card.colorHints?.[
																c
															];
														if (
															status ===
															"excluded"
														)
															return null;
														return (
															<span
																key={c}
																className="rounded-pill px-3 py-2 fw-bold"
																style={{
																	backgroundColor:
																		status ===
																		"answer"
																			? colorMap[
																					c
																				]
																			: "white",
																	color:
																		status ===
																		"answer"
																			? "white"
																			: colorMap[
																					c
																				],
																	border: "1px solid #ccc",
																}}
															>
																{c}
															</span>
														);
													},
												)}
											</div>
										</div>
									</div>
									<div className="col-6">
										<div className="mb-2">
											<strong>数字ヒント</strong>
											<div
												className="mt-1"
												style={{
													display: "grid",
													gridTemplateColumns:
														"repeat(1, 1fr)",
													gap: "0.1rem",
												}}
											>
												{[1, 2, 3, 4, 5].map((n) => {
													const status =
														card.numberHints?.[n];
													if (status === "excluded")
														return null;
													return (
														<span
															key={n}
															className="rounded-pill px-3 py-2 fw-bold"
															style={{
																backgroundColor:
																	status ===
																	"answer"
																		? "black"
																		: "white",
																color:
																	status ===
																	"answer"
																		? "white"
																		: "black",
																border: "1px solid #ccc",
															}}
														>
															{n}
														</span>
													);
												})}
											</div>
										</div>
									</div>
								</div>
								<div className="mb-2">
									<strong>ヒント履歴:</strong>
									<pre
										style={{
											fontSize: "0.85rem",
											whiteSpace: "pre-wrap",
										}}
									>
										{card.hint || "なし"}
									</pre>
								</div>
								<div className="card-footer">
									<div className="d-flex align-items-center justify-content-between mt-3">
										<label className="form-check d-flex align-items-center mb-0">
											<input
												type="checkbox"
												className="form-check-input me-2"
												style={{
													width: "4em",
													height: "2em",
												}} // ✅ サイズを大きく
												checked={card.selected}
												onChange={() => handleSelect(i)}
											/>
										</label>
										<button
											onClick={() => {
												const confirmMessage = `ID: ${card.id} のカードを出します，よろしいですか？`;
												if (
													window.confirm(
														confirmMessage,
													)
												) {
													playCard(i); // 確認後にカードを出す
												}
											}}
											className="btn btn-danger btn-sm"
										>
											カードを出す
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="mt-4">
				<h4>ヒントを追加</h4>

				<div className="mb-2">
					<div>色:</div>
					<div className="d-flex flex-wrap gap-3">
						{Object.keys(colorMap).map((c) => (
							<button
								key={c}
								onClick={() => {
									const selectedCards = hand.filter(
										(card) => card.selected,
									);
									const selectedIds = selectedCards
										.map((card) => card.id)
										.join(", ");

									let confirmMessage = "";
									if (selectedCards.length === 0) {
										confirmMessage = `すべてのカードに，色「${c}」がないというヒントを出します，よろしいですか？`;
									} else {
										confirmMessage = `ID: ${selectedIds} に色「${c}」のヒントを出します，よろしいですか？`;
									}

									if (window.confirm(confirmMessage)) {
										applyHint("color", c);
									}
								}}
								className="btn btn-outline-secondary btn-lg fw-bold"
								style={{
									color: colorMap[c],
									borderColor: colorMap[c],
								}}
							>
								{c}
							</button>
						))}
					</div>
				</div>

				<div className="mb-2">
					<div>数字:</div>
					<div className="d-flex flex-wrap gap-3">
						{[1, 2, 3, 4, 5].map((n) => (
							<button
								key={n}
								onClick={() => {
									const selectedCards = hand.filter(
										(card) => card.selected,
									);
									const selectedIds = selectedCards
										.map((card) => card.id)
										.join(", ");

									let confirmMessage = "";
									if (selectedCards.length === 0) {
										confirmMessage = `すべてのカードに，数字「${n}」がないというヒントを出します，よろしいですか？`;
									} else {
										confirmMessage = `ID: ${selectedIds} に数字「${n}」のヒントを出します，よろしいですか？`;
									}

									if (window.confirm(confirmMessage)) {
										applyHint("number", n);
									}
								}}
								className="btn btn-outline-dark btn-lg fw-bold"
							>
								{n}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HanabiMemo;
