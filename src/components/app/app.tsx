import { BrowserRouter, Route, Switch } from "react-router-dom"
import { FibonacciPage } from "../../pages/fibonacci/fibonacci"
import { ListPage } from "../../pages/list/list"
import { MainPage } from "../../pages/main/main"
import { QueuePage } from "../../pages/queue/queue"
import { StringComponent } from "../../pages/string/string"
import { SortingPage } from "../../pages/sorting/sorting"
import { StackPage } from "../../pages/stack/stack"

import styles from "./app.module.css"

export function App() {

   return (
      <div className={styles.app}>
         <BrowserRouter>
            <Switch>
               <Route path="/" exact>
                  <MainPage />
               </Route>
               <Route path="/reverse">
                  <StringComponent />
               </Route>
               <Route path="/fibonacci">
                  <FibonacciPage />
               </Route>
               <Route path="/sorting">
                  <SortingPage />
               </Route>
               <Route path="/stack">
                  <StackPage />
               </Route>
               <Route path="/queue">
                  <QueuePage />
               </Route>
               <Route path="/list">
                  <ListPage />
               </Route>
            </Switch>
         </BrowserRouter>
      </div>
   )
}
