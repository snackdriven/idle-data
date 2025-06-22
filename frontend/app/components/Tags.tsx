import type { FC } from "react";

const Tags: FC = () => {
	// For now, we'll just show static tags like in the image
	return (
		<div className="app-widget">
			<div className="app-widget-header">Tags</div>
			<div className="app-widget-content">
				<div style={{ fontSize: "11px" }}>
					demo tags placeholder text example sample
				</div>
			</div>
		</div>
	);
};

export default Tags;