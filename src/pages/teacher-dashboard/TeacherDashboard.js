import students from '../../data/students.json'

import AslBtn from "../../components/add-subtract-level-button/AslBtn";

import styles from './teachersDashboard.module.css'

function TeacherDashboard() {

    return (
        <div className={ styles["db-container"] }>
            <h3>Total students: { students.length }</h3>

            <table>
                <tr>
                    <th>Naam</th>
                    <th>Plus en min</th>
                    <th>Keer sommen</th>
                    <th>Deel sommen</th>
                    <th>Klokkijken</th>
                    <th>Geld rekenen</th>
                    <th>Meetkunde</th>
                </tr>
                { students.map( ( student ) => {
                    const { plusminus, clock, multiply, money, division, geometry } = student.subgroups;

                    return(
                        <tr>
                            <td>{ student.name } </td>
                            <td>{ plusminus }<AslBtn/> </td>
                            <td>{ multiply } <AslBtn /> </td>
                            <td>{ division } <AslBtn/> </td>
                            <td>{ clock } <AslBtn/> </td>
                            <td>{ money } <AslBtn/> </td>
                            <td>{ geometry } <AslBtn/> </td>
                        </tr>
                    )
                } ) }
            </table>


        </div>
    );
}

export default TeacherDashboard;