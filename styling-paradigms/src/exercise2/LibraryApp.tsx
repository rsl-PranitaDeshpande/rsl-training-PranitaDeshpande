import React from "react";
import { Button } from "./components/Button/Button";
import { Card } from "./components/Card/Card";
import { Badge } from "./components/Badge/Badge";

export const LibraryApp: React.FC = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
      <h1
        style={{
          fontSize: "1.75rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
        }}
      >
        Exercise 2: Vanilla Extract Component Library
      </h1>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        <Card>
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              marginBottom: "1rem",
            }}
          >
            Button Variants & Sizes
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              alignItems: "center",
            }}
          >
            <Button variant="primary" size="small">
              Primary Small
            </Button>
            <Button variant="primary" size="large">
              Primary Large
            </Button>
            <Button variant="secondary" size="small">
              Secondary
            </Button>
            <Button variant="danger" size="small">
              Danger
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </Card>

        <Card>
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              marginBottom: "1rem",
            }}
          >
            Badge Variants
          </h2>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
};
