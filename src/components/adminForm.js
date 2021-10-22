import React, { useState } from "react";
import AdminFormDefault from "./adminFormDefault";
import AdminFormAlternative from "./adminFormAlternative";

function AdminForm(props) {
  const currentId = isNaN(props.match.params.id)
    ? props.match.params.id
    : Number(props.match.params.id);

  const tableName = props.match.params.tableName;
  const url = props.match.url;

  const [showDefaultPage, setShowDefaultPage] = useState(true);
  return (
    <div>
      {showDefaultPage ? (
        <AdminFormDefault
          currentId={currentId}
          tableName={tableName}
          url={url}
          handleShow={setShowDefaultPage}
        />
      ) : (
        <AdminFormAlternative
          currentId={currentId}
          tableName={tableName}
          url={url}
          handleShow={setShowDefaultPage}
        />
      )}
    </div>
  );
}

export default AdminForm;
