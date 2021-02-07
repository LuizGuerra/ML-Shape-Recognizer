import java.util.ArrayList;
import java.util.List;
import java.io.*;

public class RenameFiles {

    // private static String[] fileName = {"vid_", "vid__", "VID_", "VID__"};

    public static void main (String args[]) {
        List<String> fileNames = FolderManager.getFiles();
        List<String> circulos = new ArrayList<>();
        List<String> quadrados = new ArrayList<>();
        List<String> triangulos = new ArrayList<>();
        for (String name : fileNames) {
            if (name.contains("circle")) {
                circulos.add(name);
            } else if (name.contains("square")) {
                quadrados.add(name);
            } else if (name.contains("triangle")) {
                triangulos.add(name);
            }
        }
        renameAll(circulos, "circle");
        renameAll(quadrados, "square");
        renameAll(triangulos, "triangle");
    }

    private static void renameAll(List<String> files, String pattern) {
        printBeggining();

        List<Boolean> log = new ArrayList<>();
        String renamed = FolderManager.saucePath + pattern;
        Boolean allWentWell = true, currentFileStatus = true;
        for (int i = 0; i < files.size(); i++ ) {
            File f1 = new File(files.get(i));
            File f2 = new File(renamed + (i<10 ? "0"+i : i) + ".png");
            currentFileStatus = f1.renameTo(f2);
            log.add(currentFileStatus);
            allWentWell = allWentWell && currentFileStatus;
        }

        printStatus(allWentWell, log);
        printEnd();
    }

    private static void printBeggining() {
        System.out.println("\n\n---------------------------------");
        System.out.printf ("--- RENAMING FILES IN PATH %s ---\n", FolderManager.saucePath);
        System.out.println("---           START           ---");
    }

    private static void printStatus(Boolean allWentWell, List<Boolean> log) {
        System.out.printf("All %d files renamed correctly? %b\n", log.size(), allWentWell);
        if (!allWentWell) {
            log.forEach( l -> { System.out.print(l + "-"); } );
            System.out.println();
        }
    }

    private static void printEnd() {
        System.out.println("---            END            ---");
        System.out.println("---------------------------------\n\n");
    }
    
}