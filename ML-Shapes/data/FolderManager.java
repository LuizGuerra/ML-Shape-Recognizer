import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import java.io.*;


/**
 * attrib -h -s "file name" - Show file
 * attrib +h -s "file name" - Hide file
 */

public class FolderManager {
    public static String saucePath = "";
    public static String readyPath = "";
    public static List<String> getFiles() {
        try(Stream<Path> walk = Files.walk(Paths.get(saucePath))) {
            return walk.filter(Files::isRegularFile)
                .map(x -> x.toString()).collect(Collectors.toList());
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return null;
    }
    public static File renameToReady(File file) {
        String [] str = file.getName().split("\\.");
        String [] str2 = str[0].split("\\\\");
        File renamed = new File(readyPath + str2[str2.length-1] + "." + str[1]);
        if (!file.renameTo(renamed)) { return null; }
        return renamed;
    }
}