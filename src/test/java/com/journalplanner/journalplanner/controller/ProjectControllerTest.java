package com.journalplanner.journalplanner.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.journalplanner.journalplanner.model.Project;
import com.journalplanner.journalplanner.service.ProjectService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static junit.framework.TestCase.assertEquals;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class ProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private ProjectService projectService;

    @InjectMocks
    private ProjectController projectController;

    private ObjectMapper mapper = new ObjectMapper();

    List<Project> testProjects = new ArrayList<>();

    private static final String url = "/api/project/";

    @Before
    public void setup(){
        mockMvc = MockMvcBuilders.standaloneSetup(projectController).build();

        Project project1 = new Project();
        project1.setId(1);
        project1.setName("Test Project 1");
        project1.setUrl("www.project1.co.uk");

        Project project2 = new Project();
        project2.setId(2);
        project2.setName("Test Project 2");
        project2.setUrl("www.project2.co.uk");

        testProjects = Arrays.asList(project1, project2);

        given(projectService.getAllProjects()).willReturn(testProjects);
    }

    @Test
    public void testGetAllProjects() throws Exception {
        MvcResult result = mockMvc.perform(get(url+"all")).andExpect(status().is2xxSuccessful()).andReturn();

        List<Project> project = mapper.readValue(result.getResponse().getContentAsString(), mapper.getTypeFactory().constructCollectionType(List.class, Project.class));

        assertThat(project.get(0)).isEqualToComparingFieldByField(testProjects.get(0));
        assertThat(project.get(1)).isEqualToComparingFieldByField(testProjects.get(1));
        assertEquals(project.size(), testProjects.size());
        assertEquals(result.getResponse().getStatus(), 200);
    }

    @Test
    public void testGetAllProjectsAndStatus400() throws Exception {
        MvcResult result = mockMvc.perform(get(url+"alll")).andExpect(status().is4xxClientError()).andReturn();

        assertEquals(result.getResponse().getStatus(), 400);
    }
}
