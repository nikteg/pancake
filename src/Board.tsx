import { Form, Formik } from "formik"
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react/lib/Button"
import { Dialog, DialogContent, DialogFooter, DialogType } from "office-ui-fabric-react/lib/Dialog"
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown"
import { TextField } from "office-ui-fabric-react/lib/TextField"
import * as React from "react"
import { DragDropContext } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"
import { connect } from "react-redux"
import { addItem } from "./actions"
import { Swimlane } from "./api"
import "./Board.css"
import Column from "./Column"
import { RootState } from "./reducers"

type Props = {
  columns: Record<number, Swimlane>
  addItem: typeof addItem
}

type State = {
  addDialogOpen: boolean
  addDialogColumn: number
}

@DragDropContext(HTML5Backend)
class Board extends React.Component<Props, State> {
  state: State = {
    addDialogOpen: false,
    addDialogColumn: 0,
  }

  closeAddDialog = () => this.setState({ addDialogOpen: false })
  showAddDialog = (column: number) => this.setState({ addDialogColumn: column, addDialogOpen: true })

  public render() {
    const { columns, addItem } = this.props

    return (
      <div className="Board">
        <div className="Board--columns">
          {Object.keys(columns).map((col) => (
            <Column id={columns[col].id} key={columns[col].id} onAddItem={this.showAddDialog} />
          ))}
        </div>
        <Dialog
          styles={{
            main: [
              {
                selectors: {
                  ["@media (min-width: 480px)"]: {
                    maxWidth: "640px",
                    minWidth: "400px",
                  },
                },
              },
            ],
          }}
          hidden={!this.state.addDialogOpen}
          onDismiss={this.closeAddDialog}
          dialogContentProps={{
            type: DialogType.largeHeader,
            title: "Add item",
          }}
          modalProps={{
            isBlocking: false,
            isDarkOverlay: true,
          }}
        >
          <Formik<{ title: string; column: number }>
            initialValues={{
              title: "",
              column: this.state.addDialogColumn,
            }}
            onSubmit={({ title, column }) => {
              addItem(title, column)
              this.closeAddDialog()
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <DialogContent>
                  <Dropdown
                    label="Column:"
                    selectedKey={String(values.column)}
                    options={Object.keys(columns).map((col) => ({ key: col, text: columns[col].name }))}
                    onChanged={(item) => setFieldValue("column", Number(item.key))}
                  />
                  <TextField
                    autoFocus
                    label="Title:"
                    required
                    value={values.title}
                    onChange={(_, value) => setFieldValue("title", value)}
                  />
                </DialogContent>
                <DialogFooter>
                  <PrimaryButton type="submit" text="Add" />
                  <DefaultButton onClick={this.closeAddDialog} text="Cancel" />
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </Dialog>
      </div>
    )
  }
}

export default connect(
  (state: RootState) => ({
    columns: state.swimlanes,
  }),
  { addItem },
)(Board)
